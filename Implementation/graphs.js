/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

/*
 * Graph variableX on the x-axis against variableY on the y-axis
 */
function createGraph(graphObject, textX, textY)
{
  var margin = {top: 30, right: 240, bottom: 100, left: 70},
      width = 1150 - margin.left - margin.right,
      height = 550 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { return x(+d.variableX); })
      .y(function(d) { return y(+d.variableY); });

  // define format
  var decimalFormat = d3.format("0.2f");

  var svg = d3.select("#graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // define label for crosshairs
  var label = svg.append("text")
      .attr("x", width - 5)
      .attr("y", height - 5)
      .style("text-anchor", "end");
  var labelPoint = svg.append("text");

  // define domains
  xDomain = d3.extent(graphObject, function(d) { return +d.variableX; });
  yDomain = d3.extent(graphObject, function(d) { return +d.variableY; });
  x.domain(xDomain);
  y.domain(yDomain);

  // create x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("transform", "rotate(0)")
      .attr("y", -10)
      .attr("x", 1080)
      .attr("dy", "0em")
      .attr("dx", "-.50em")
      .style("text-anchor", "end")
      .style("font", "16px arial")
      .text(textX);

  // create y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".85em")
      .attr("dx", "-.65em")
      .style("text-anchor", "end")
      .style("font", "16px arial")
      .text(textY);

  // draw the line
  svg.append("path")
      .datum(graphObject)
      .attr("id", "lineGraph")
      .attr("class", "line")
      .attr("d", line);

  // set points on the line
  var points = svg.selectAll(".point")
          .data(graphObject).enter();

  points.append("svg:circle")
     .attr("stroke", "red")
     .attr("fill", "white")
     .attr("cx", function(d, i) { return x(+d.variableX) })
     .attr("cy", function(d, i) { return y(+d.variableY) })
     .attr("r", function(d, i) { return 4 })
     .attr("class", "circle");

  // focus tracking
  var focus = svg.append('g').style('display', 'none');

  focus.append('line')
      .attr('id', 'focusLineX')
      .attr('class', 'focusLine');
  focus.append('line')
      .attr('id', 'focusLineY')
      .attr('class', 'focusLine');
  focus.append('circle')
      .attr('id', 'focusCircle')
      .attr('r', 4)
      .attr('class', 'circle focusCircle');

  var bisectX = d3.bisector(function(d) { return +d.variableX; }).left;

  svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', function() { focus.style('display', null); })
      .on('mouseout', function() { focus.style('display', 'none'); })
      .on('mousemove', function() {
          var mouse = d3.mouse(this);
          var mouseX = x.invert(mouse[0]);

          // file 1
          var i = bisectX(graphObject, mouseX); // returns the index to the current data item

          var d0 = graphObject[i - 1]
          var d1 = graphObject[i];
          // work out which date value is closest to the mouse
          var d_index = (+d1.variableX - +d0.variableX) / 2.0 > mouseX - +d0.variableX ? d0 : d1;
          // mouseX - d0[0] > d1[0] - mouseX ? d1 : d0;

          var xVal = x(+d_index.variableX);
          var yVal = y(+d_index.variableY);
          var countryVal = d_index.country;

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
          labelPoint.attr("x", xVal + 10).attr("y", yVal + 15).style("text-anchor", "center");
          labelPoint.text(function() {
            return countryVal + " (" + decimalFormat(x.invert(xVal)) + ", " + decimalFormat(y.invert(yVal)) + ")";
          });

          // put a text label in the lower-right corner
          label.text(function() {
            return "x=" + decimalFormat(x.invert(mouse[0])) + ", y=" + decimalFormat(y.invert(mouse[1]));
          });
      });
}
