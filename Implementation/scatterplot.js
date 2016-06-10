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
    var margin = {top: 40, right: 250, bottom: 50, left: 70},
        width = 1150 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    // define the x axis
    var x = d3.scale.linear()
            .range([0, width]);

    var xAxis = d3.svg.axis()
    	  .scale(x)
    	  .orient('bottom');

    // define the y axis
    var y = d3.scale.linear()
    	      .range([height, 0]);

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

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

    // main canvas
    var main = plot.append('g')
      	.attr('width', width)
      	.attr('height', height)
      	.attr('class', 'main');

    // draw x-axis
    main.append('g')
        .attr('class', 'x axis')
      	.attr('transform', 'translate(0,' + height + ')')
      	.call(xAxis)
      .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", -10)
        .attr("x", 840)
        .attr("dy", "0em")
        .attr("dx", "-.50em")
        .style("text-anchor", "end")
        .style("font", "16px arial")
        .text(textX);

    // draw y-axis
    main.append('g')
        .attr('class', 'y axis')
      	.attr('transform', 'translate(0,0)')
      	.call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".85em")
        .attr("dx", "-.65em")
        .style("text-anchor", "end")
        .style("font", "16px arial")
        .text(textY);

    // draw the dots
    var scatterdots = main.append("svg:g");
    scatterdots.selectAll("scatter-dots")
      .data(plotObject)
      .enter().append("svg:circle")
          .attr("fill", "steelblue")
          .attr("cx", function (d,i) { return x(+d.variableX); })
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
        .attr('r', 7.5)
        .attr('class', 'circle focusCircle');

    // get the index of the x-value at the left of the mouse
    var bisectX = d3.bisector(function(d) { return +d.variableX; }).left;

    // define label for crosshairs
    var label_point = main.append("text");

    // initialise the overlay
    main.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', function() { focus.style('display', null); })
        .on('mouseout', function() { focus.style('display', 'none'); })
        .on('mousemove', function() {
            // define mouse
            var mouse = d3.mouse(this);
            var mouseX = x.invert(mouse[0]);

            // returns the index to the current data item
            var i = bisectX(plotObject, mouseX);

            // store values left and right of the mouse
            var d0 = plotObject[i - 1]
            var d1 = plotObject[i];

            // work out which x-value is closest to the mouse
            var d_index = (+d1.variableX - +d0.variableX) / 2.0 > mouseX - +d0.variableX ? d0 : d1;

            // store selected coordinate
            var xVal = x(+d_index.variableX);
            var yVal = y(+d_index.variableY);

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

            // define label for crosshairs
            label_point.attr("x", xVal + 10).attr("y", yVal + 13).style("text-anchor", "center");
            label_point.text(function() {
              return "x=" + x.invert(xVal) + ", y=" + y.invert(yVal);
            });
        });

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
		var trendData = [[x1,y1,x2,y2]];

    // define format
    var decimalFormat = d3.format("0.2f");

    // define tooltip to display r-squared and regression equation
    var tip = d3.tip()
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
    main.call(tip);

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
			.attr("stroke", "black")
			.attr("stroke-width", 4)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    /*
    // display equation on the chart
    main.append("text")
      .text("eq: " + decimalFormat(leastSquaresCoeff.slope) + "x + " +
        decimalFormat(leastSquaresCoeff.intercept))
      .attr("class", "text-label")
      .attr("x", function(d) {return x(x2) - 60;})
      .attr("y", function(d) {return y(y2) - 30;});

    // display r-square on the chart
    main.append("text")
      .text("r-sq: " + decimalFormat(leastSquaresCoeff.rSquared))
      .attr("class", "text-label")
      .attr("x", function(d) {return x(x2) - 60;})
      .attr("y", function(d) {return y(y2) - 10;});
    */

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
}
