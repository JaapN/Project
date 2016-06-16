/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

// draws a barchart of the educational field distribution of the respective country
function createBarchart(country, barchartObject, groupNames)
{
    // define margins
    var margin = {top: 20, right: 30, bottom: 100, left: 200},
        width = 1150 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#ff8c00", "#98abc5"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var barchart = d3.select("#barchart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // define and initialise tooltip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>Percentage:</strong> <span style='color:red'>" + d.percentage + "</span>";
    });
    barchart.call(tip);

    // define the x (x0), group (x1) and y domains
    x0.domain(barchartObject.map(function(d) { return d.field; }));
    x1.domain(groupNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(barchartObject, function(d) { return d3.max(d.groups, function(d) { return +d.percentage; }); })]);

    // title
    barchart.append("g")
        .attr("class", "title")
      .append("text")
        .attr("x", width / 3)
        .attr("y", 10)
        .style("font", "36px cambria")
        .text(country);

    // x-axis
    barchart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.5em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-20)");

    // y-axis
    barchart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Percentage");

    // select fields / bars
    var field = barchart.selectAll(".field")
        .data(barchartObject)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x0(d.field) + ",0)"; });

    // create bars
    field.selectAll("rect")
        .data(function(d) { return d.groups; })
      .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.name); })
        .attr("y", function(d) { return y(+d.percentage); })
        .attr("height", function(d) { return height - y(+d.percentage); })
        .style("fill", function(d) { return color(d.name); })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

    // create legend
    var legend = barchart.selectAll(".legend")
        .data(groupNames.slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // legend colours
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    // legend text
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

  // change display depending on the availability of data
  if (barchartObject[0] != undefined && barchartObject[0].Country != "")
  {
    d3.select("#barchart").style("display", "");
  }
  else
  {
    d3.select("#barchart").style("display", "none");
    // d3.select("#noData").html("<font size='14px'><center><b>Sorry! There is no data for this country!</b></center></font>");
  }
}
