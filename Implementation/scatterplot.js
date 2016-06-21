/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

/*
 * Plot variableX on the x-axis against variableY on the y-axis
 */
function createPlot(plotObject, textX, textY)
{
  // define margins
  var margin = {top: 50, right: 300, bottom: 120, left: 100},
      width = 1150 - margin.left - margin.right,
      height = 550 - margin.top - margin.bottom;

  // define x-pixel-scaling
  var x = d3.scale.linear()
          .range([0, width]);

  // define the x axis
  var xAxis = d3.svg.axis()
  	  .scale(x)
  	  .orient('bottom');

  // define y-pixel-scaling
  var y = d3.scale.linear()
  	      .range([height, 0]);

  // define the y axis
  var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left');

  // define format
  var decimalFormat = d3.format("0.2f");

  // define domains
  xDomain = d3.extent(plotObject, function(d) { return +d.variableX; });
  yDomain = d3.extent(plotObject, function(d) { return +d.variableY; });
  x.domain(xDomain);
  y.domain(yDomain);

  // initialise scatterplot
  var plot = d3.select("#scatterplot").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class', 'chart')
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var main = plot.append('g')
    	.attr('width', width)
    	.attr('height', height)
    	.attr('class', 'main');

  // draw x-axis (note: margin of 15)
  main.append('g')
      .attr('class', 'x axis')
    	.attr('transform', 'translate(0,' + (height + 15) + ')')
    	.call(xAxis)
    .append("text")
      .attr("transform", "rotate(0)")
      .attr("y", 60)
      .attr("x", 770)
      .attr("dy", "0em")
      .attr("dx", "-.50em")
      .style("text-anchor", "end")
      .style("font", "16px arial")
      .text(textX);

  // draw y-axis (note: margin of 15)
  main.append('g')
      .attr('class', 'y axis')
    	.attr('transform', 'translate(-15,0)')
    	.call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -80)
      .attr("dy", ".85em")
      .attr("dx", "-.65em")
      .style("text-anchor", "end")
      .style("font", "16px arial")
      .text(textY);

  /*
   * Draw a regression line
   */
  // obtain series for x and y (and rename them)
  var xSeries = plotObject.map(function(d) { return parseFloat(+d.variableX); });
  var ySeries = plotObject.map(function(d) { return parseFloat(+d.variableY); });

  // obtain slope, intercept and rSquared
	var leastSquaresCoeff = leastSquares(xSeries, ySeries);

	// apply the results of the least squares regression
	var x1 = xSeries[0];
	var y1 = leastSquaresCoeff.slope * xSeries[0] + leastSquaresCoeff.intercept;
	var x2 = xSeries[xSeries.length - 1];
	var y2 = leastSquaresCoeff.slope * xSeries[xSeries.length - 1] + leastSquaresCoeff.intercept;

  // change endpoints of the regression line if y2 is lower/higher than minimal/maximal y-axis value
  if (y2 < d3.min(ySeries))
  {
    y2 = d3.min(ySeries);
    x2 = (d3.min(ySeries) - leastSquaresCoeff.intercept) / leastSquaresCoeff.slope;
  }
  else if (y2 > d3.max(ySeries))
  {
    y2 = d3.max(ySeries);
    x2 = (d3.max(ySeries) - leastSquaresCoeff.intercept) / leastSquaresCoeff.slope;
  }

  // store coordinates in trendData
	var trendData = [[x1,y1,x2,y2]];

  // define the regression line
  var trendline = main.selectAll(".trendline")
    .data(trendData);

  // define tooltip to display r-squared and regression equation
  var tipRegrLine = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 412])
      .html(function(d) {
        return "<strong>Equation:</strong> <span style='color:red'>" +
        decimalFormat(leastSquaresCoeff.slope) + "x + " +
        decimalFormat(leastSquaresCoeff.intercept) +
        "</span><br><strong>R-Squared:</strong> <span style='color:red'>" +
        decimalFormat(leastSquaresCoeff.rSquared) + "</span>";
      });
  // initialise tooltip
  main.call(tipRegrLine);

  // draw the regression line
	trendline.enter()
		.append("line")
		.attr("class", "trendline")
		.attr("x1", function(d) { return x(d[0]); })
		.attr("y1", function(d) { return y(d[1]); })
		.attr("x2", function(d) { return x(d[2]); })
		.attr("y2", function(d) { return y(d[3]); })
		.attr("stroke", "steelblue")
		.attr("stroke-width", 3)
    .on('mouseover', tipRegrLine.show)
    .on('mouseout', tipRegrLine.hide);

  // display equation on the chart
  main.append("text")
    .text("eq: " + decimalFormat(leastSquaresCoeff.slope) + "x + "
     + decimalFormat(leastSquaresCoeff.intercept))
      .attr("class", "text-label")
      .attr("x", function(d) {return x(x2) + 15;})
      .attr("y", function(d) {return y(y2) - 25;})
      .attr("font-weight", "bold");

  // display r-square on the chart
  main.append("text")
    .text("r-sq: " + decimalFormat(leastSquaresCoeff.rSquared))
      .attr("class", "text-label")
      .attr("x", function(d) {return x(x2) + 15;})
      .attr("y", function(d) {return y(y2) - 5;})
      .attr("font-weight", "bold");

  // returns slope, intercept and r-square of the line
  function leastSquares(xSeries, ySeries) {
    // define function necessary for calculating averages
    var reduceSumFunc = function(prev, cur) { return prev + cur; };

    // calculate averages
  	var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
  	var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

    // calculate the total sum of squares for x
  	var ssXX = xSeries.map(function(d) { return Math.pow(d - xBar, 2); })
  		.reduce(reduceSumFunc);

    // calculate the total sum of squares for y
  	var ssYY = ySeries.map(function(d) { return Math.pow(d - yBar, 2); })
  		.reduce(reduceSumFunc);

    // calculate sum of the products of residuals (numerator of covariance)
  	var ssXY = xSeries.map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
  		.reduce(reduceSumFunc);

    // calculate slope, intercept and rSquared
  	var slope = ssXY / ssXX;
  	var intercept = yBar - (xBar * slope);
  	var rSquared = Math.pow(ssXY, 2) / (ssXX * ssYY);

    // convert to dictionary and return
    var linearModel = {};
    linearModel['slope'] = slope;
    linearModel['intercept'] = intercept;
    linearModel['rSquared'] = rSquared;
  	return linearModel;
  }

  /*
   * Draw the data
   */
  // draw the dots
  var scatterdots = main.append("svg:g");
  scatterdots.selectAll("scatterdots")
    .data(plotObject)
    .enter().append("svg:circle")
        .attr("stroke", "green")
        .attr("stroke-width", 3)
        .attr("fill", "white")
        .attr("cx", function (d) { return x(+d.variableX); })
        .attr("cy", function (d) { return y(+d.variableY); })
        .attr("r", 8);

  // focus tracking (interactivity)
  var focus = main.append('g').style('display', 'none');
  focus.append('line')
      .attr('id', 'focusLineX')
      .attr('class', 'focusLine');
  focus.append('line')
      .attr('id', 'focusLineY')
      .attr('class', 'focusLine');
  focus.append('circle')
      .attr('id', 'focusCircle')
      .attr('r', 6.5)
      .attr('class', 'circle focusCircle');

  // get the object count (index + 1) of the x-value to the left of inserted value
  var bisectX = d3.bisector(function(d) { return +d.variableX; }).left;
  // get the object count (index + 1) of the y-value below and above of inserted value
  var bisectYbot = d3.bisector(function(d) { return +d.variableY; }).left;
  var bisectYtop = d3.bisector(function(d) { return +d.variableY; }).right;

  // define tooltip to display value of selected dot
  var labelPoint = main.append("text");

  // make it interactive
  main.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseout', function() { focus.style('display', 'none'); labelPoint.style('display', 'none'); })
      .on('mousemove', function() {
          // define mouse coordinates
          var mouse = d3.mouse(this);
          var mouseX = x.invert(mouse[0]);
          var mouseY = y.invert(mouse[1]);

          // returns the index to the current data item
          var indexItemX = bisectX(plotObject, mouseX) - 1;
          var indexItemYbot = bisectYbot(plotObject, mouseY) - 1;
          var indexItemYtop = bisectYtop(plotObject, mouseY) - 1;

          console.log(
            "mouseY:", mouseY,
            "indexTop:", indexItemYtop,
            "indexBot:", indexItemYbot
          );

          // store values left, right and below the mouse
          var dLeft = plotObject[indexItemX];
          var dRight = plotObject[indexItemX + 1];
          var dBottom = plotObject[indexItemYbot];
          var dTop = plotObject[indexItemYtop];

          // work out which x-value and y-value is closest to the mouse
          var dSelectedX = (+dRight.variableX - +dLeft.variableX) / 2.0 > mouseX - +dLeft.variableX ? dLeft : dRight;
          var dSelectedY = (+dTop.variableY - +dBottom.variableY) / 2.0 > mouseY - +dBottom.variableY ? dBottom : dTop;

          console.log(
            "dLeft: ", dLeft, '\n',
            "dRight: ", dRight, '\n',
            "dBottom: ", dBottom, '\n',
            "dTop: ", dTop, '\n',
            "dSelectedX: ", dSelectedX, '\n',
            "dSelectedY: ", dSelectedY
          );

          // work out which datapoint to select depending on which is closest to the mouse
          if ((dSelectedX == dLeft) && (dSelectedX.variableY == dSelectedY.variableY))
          {
            // display focus and label
            focus.style('display', null);
            labelPoint.style('display', null);

            // select this indiced object
            var dSelected = dLeft;
          }
          else if ((dSelectedX == dRight) && (dSelectedX.variableY == dSelectedY.variableY))
          {
            // display focus
            focus.style('display', null);
            labelPoint.style('display', null);

            // select this indiced object
            var dSelected = dRight;
          }
          else if ((dSelectedY == dBottom) && (dSelectedY.variableX == dSelectedX.variableX))
          {
            // display focus
            focus.style('display', null);
            labelPoint.style('display', null);

            // select this indiced object
            var dSelected = dBottom;
          }
          else if ((dSelectedY == dTop) && (dSelectedY.variableX == dSelectedX.variableX))
          {
            // display focus
            focus.style('display', null);
            labelPoint.style('display', null);

            // select this indiced object
            var dSelected = dTop;
          }
          // don't define dSelected if there is no match between X and Y
          else
          {
            // don't display focus and label
            var dSelected = undefined;
            focus.style('display', 'none');
            labelPoint.style('display', 'none');
          }

          // if dSelected is defined, select scatterdot
          if (dSelected != undefined)
          {
            // store selected coordinate
            var xVal = x(+dSelected.variableX);
            var yVal = y(+dSelected.variableY);
            var countryVal = dSelected.country;

            // adjust focus
            focus.select('#focusCircle')
                .attr('cx', xVal)
                .attr('cy', yVal);
            focus.select('#focusLineX')
                .attr('x1', xVal).attr('y1', y(yDomain[0]))
                .attr('x2', xVal).attr('y2', y(yDomain[1]));
            focus.select('#focusLineY')
                .attr('x1', x(xDomain[0])).attr('y1', yVal)
                .attr('x2', x(xDomain[1])).attr('y2', yVal);

            // build barchart for selected datapoint
            getBarchart(countryVal);

            // define and set label for crosshairs
            labelPoint.attr("x", (xVal + 15)).attr("y", (yVal - 7)).style("text-anchor", "center").style("font-weight", "bold");
            labelPoint.text(function() {
              return countryVal + " (" + decimalFormat(x.invert(xVal)) + ", " + decimalFormat(y.invert(yVal)) + ")";
            });
          }
      });
}
