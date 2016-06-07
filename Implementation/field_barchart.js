/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

// draws a barchart of the educational field distribution of the respective country
function getBarchart(country)
{
    // clear the previous barchart
    $("#barchart").empty();

    // define margins
    var margin = {top: 20, right: 30, bottom: 100, left: 250},
        width = 1150 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    // define x-axis
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // define separator and colour panel
    var x1 = d3.scale.ordinal();

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#ff8c00"]);

    // define y-axis
    var y = d3.scale.linear()
        .range([height, 0]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(20);

    // initialise barchart
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

    // load the data
    d3.json('fields_grad_info.json',
    function(error, data) {
      if (error) { throw error; }
      data = data.points;

      // extract the relevant variables to a newly defined object
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

      /*
      averagePerc = {
        Teacher training and education science: "",
        Arts: [],
        Humanities: [],
        Social and behavioural science: [],
        Journalism and information: [],
        Business and administration: [],
        Law: [],
        Life science: [],
        Physical science: [],
        Mathematics and statistics: [],
        Computing: [],
        Engineering and engineering trades: [],
        Manufacturing and processing: [],
        Architecture and building: [],
        Agriculture, forestry and fishery: [],
        Veterinary: [],
        Health: [],
        Social services: [],
        Personal services: [],
        Transport services: [],
        Environmental protection: [],
        Security services: []
      };
      */

      averagePerc = {};
      data.forEach(function(d) {
          averagePerc[d.field] += d.Value;
      });
      console.log(averagePerc);

      // define the x and y domains
      x.domain(barchartObject.map(function(d) { return d.field; }));
      y.domain([0, d3.max(barchartObject, function(d) { return +d.percentage; })]);

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
          .attr("dy", "-3em")
          .style("text-anchor", "end")
          .style("font", "18px sans-serif")
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
          .attr("height", function(d) { return height - y(+d.percentage); })
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
          .attr("y", function(d) { return y(+d.percentage) - 5; })
          .attr("dy", "0.1em")
          .text(function(d) { return d.percentage; });

      // change display depending on the availability of data
      if (barchartObject[0] != undefined && barchartObject[0].percentage != "")
      {
        d3.select("#barchart").style("display", "")
      }
      else
      {
        d3.select("#barchart").style("display", "none");
        return "Sorry! There is no data for this country!"
      }
    });
}
