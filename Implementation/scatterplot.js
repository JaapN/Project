/*
 * Graph student skills on the x-axis against employment on the y-axis
 */
// load the files
d3_queue.queue()
 .defer(d3.json, "BLI_info.json")
 .defer(d3.json, "fields_grad_info.json")
 .await(function(error, file1, file2) {
    if (error) throw error("Error: the files did not load!");
    file1 = file1.points;
    file2 = file2.points;

    graphObject = [];
    counter = 0;
    file1.forEach(function(d) {
        if (d.indicator == "Employment rate")
        {
            graphObject.push(
            {
              Employ: d.Value,
              StuSkill: undefined
            });
        }
        else if (d.indicator == "Student skills")
        {
            graphObject[counter].StuSkill = d.Value;
            counter++;
        }
    });

    var margin = {top: 50, right: 250, bottom: 50, left: 50},
        width = 1160 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

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

    // sort the x-axis ascendingly
    graphObject.sort(function(x, y)
    {
        return d3.ascending(x.StuSkill, y.StuSkill);
    });

    var line = d3.svg.line()
        .x(function(d) { return x(+d.StuSkill); })
        .y(function(d) { return y(+d.Employ); });

    var svg = d3.select("#graph_StuSkill_Employ").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // define label for crosshairs
    var label = svg.append("text")
        .attr("x", width - 5)
        .attr("y", height - 5)
        .style("text-anchor", "end");
    var label_point = svg.append("text");

    // define domains
    xDomain = d3.extent(graphObject, function(d) { return +d.StuSkill; });
    yDomain = d3.extent(graphObject, function(d) { return +d.Employ; });
    x.domain(xDomain);
    y.domain(yDomain);

    // create x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", 0)
        .attr("x", 1060)
        .attr("dy", "0em")
        .attr("dx", "-.50em")
        .style("text-anchor", "end")
        .style("font", "16px arial")
        .text("Student skills (PISA)");

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
        .text("Employment rate (%)");

    // draw the line
    svg.append("path")
        .datum(graphObject)
        .attr("id", "line_Employ_StuSkill")
        .attr("class", "line")
        .attr("d", line);

    // set points on the line
    var points = svg.selectAll(".point")
            .data(graphObject).enter();

    points.append("svg:circle")
       .attr("stroke", "red")
       .attr("fill", function(d, i) { return "white" })
       .attr("cx", function(d, i) { return x(+d.StuSkill) })
       .attr("cy", function(d, i) { return y(+d.Employ) })
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

    var bisectDate = d3.bisector(function(d) { return +d.StuSkill; }).left;

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
            var i = bisectDate(graphObject, mouseX); // returns the index to the current data item

            var d0 = graphObject[i - 1]
            var d1 = graphObject[i];
            // work out which date value is closest to the mouse
            var d_index = (+d1.StuSkill - +d0.StuSkill) / 2.0 > mouseX - +d0.StuSkill ? d0 : d1;
            // mouseX - d0[0] > d1[0] - mouseX ? d1 : d0;

            var xVal = x(+d_index.StuSkill);
            var yVal = y(+d_index.Employ);

            focus.select('#focusCircle')
                .attr('cx', xVal)
                .attr('cy', yVal);
            focus.select('#focusLineX')
                .attr('x1', xVal).attr('y1', y(yDomain[0]))
                .attr('x2', xVal).attr('y2', y(yDomain[1]));
            focus.select('#focusLineY')
                .attr('x1', x(xDomain[0])).attr('y1', yVal)
                .attr('x2', x(xDomain[1])).attr('y2', yVal);

            // define label for crosshairs file1
            label_point.attr("x", xVal + 10).attr("y", yVal + 13).style("text-anchor", "center");
            label_point.text(function() {
              return "x=" + x.invert(xVal) + ", y=" + y.invert(yVal);
            });

            // put a text label in the lower-right corner
            label.text(function() {
              return "x=" + x.invert(mouse[0]) + ", y=" + y.invert(mouse[1]);
            });
        });
  });
