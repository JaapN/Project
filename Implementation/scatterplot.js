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
      width = 1300 - margin.left - margin.right,
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
      .attr("y", 55)
      .attr("x", 915)
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

  // draw the regression line
	trendline.enter()
		.append("line")
		.attr("class", "trendline")
		.attr("x1", function(d) { return x(d[0]); })
		.attr("y1", function(d) { return y(d[1]); })
		.attr("x2", function(d) { return x(d[2]); })
		.attr("y2", function(d) { return y(d[3]); })
		.attr("stroke", "steelblue")
		.attr("stroke-width", 3);

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
  // define tooltip to display country and coordinates per datapoint
  var tooltip = d3.tip()
     .attr('class', 'd3-tip')
     .offset([-10, 0])
     .html(function(d) {
       return "<strong>Country:</strong> <span style='color:red'>" +
       d.country + "</span><br><strong>Coordinates:</strong> <span style='color:red'>("
       + decimalFormat(d.variableX) + ", " + decimalFormat(d.variableY) + ")</span>";
     });
  // initialise tooltip
  main.call(tooltip);

  // draw the dots
  var scatterdots = main.append("svg:g");
  scatterdots.selectAll("scatterdots")
    .data(plotObject)
    .enter().append("svg:circle")
        .attr("class", "scatterdot")
        .attr("stroke", "green")
        .attr("stroke-width", 3)
        .attr("fill", "white")
        .attr("cx", function (d) { return x(+d.variableX); })
        .attr("cy", function (d) { return y(+d.variableY); })
        .attr("r", 8)
        .on("click", function(d) { getBarchart(d.country); })
        .on("mouseover", tooltip.show)
        .on("mouseout", tooltip.hide);

  // display equation on the chart
  main.append("text")
    .text("Equation: " + decimalFormat(leastSquaresCoeff.slope) + "x + "
     + decimalFormat(leastSquaresCoeff.intercept))
      .attr("class", "text-label")
      .attr("x", function(d) {return 920;})
      .attr("y", function(d) {return y(y2) - 20;});

  // display r-square on the chart
  main.append("text")
    .text("R squared: " + decimalFormat(leastSquaresCoeff.rSquared))
      .attr("class", "text-label")
      .attr("x", function(d) {return 920;})
      .attr("y", function(d) {return y(y2);});
}
