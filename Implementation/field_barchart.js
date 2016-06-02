/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

function getBarchart(country)
{
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = 1170 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(30);

    var barchart = d3.select("#barchart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>Percentage:</strong> <span style='color:red'>" + +d.percentage + "</span>";
    });

    barchart.call(tip);

    // load the data
    d3.json('fields_grad_info.json',
    function(error, data) {
      if (error)
      {
        throw error;
      }
      data = data.points;

      barchartObject = [];
      data.forEach(function(d) {
          if (d.country == country)
          {
              barchartObject.push(
              {
                percentage: d.Value,
                field: d.field
              });
          }
      });

      x.domain(barchartObject.map(function(d) { return d.field; }));
      y.domain([0, d3.max(barchartObject, function(d) { return d.percentage; })]);

      // x-axis
      barchart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      // y-axis
      barchart.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .style("font", "24px sans-serif")
          .text("Educational graduate field distribution of " + country);

      // create rectangles
      barchart.append("g")
        .attr("class", "bars")
      .selectAll(".bar")
          .data(barchartObject)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.field); })
          .attr("y", function(d) { return y(d.percentage); })
          .attr("height", function(d) { return height - y(d.percentage); })
          .attr("width", x.rangeBand())
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

      // add text
      barchart.append("g")
        .attr("class", "texts")
      .selectAll(".text")
          .data(barchartObject)
        .enter().append("text")
          .attr("class", "label")
          .attr("transform", function(d) { return "translate(" + x(d.field) + ",0)"; })
          .attr("x", x.rangeBand() / 2)
          .attr("y", function(d) { return y(d.percentage) + 3; })
          .attr("dy", "1em")
          .text(function(d) { return d.percentage; });
    });

    d3.select("#barchart").style("display", "");
}
