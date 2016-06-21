            <option selected disabled>Select a colour mapping variable</option>
            <option value="'Employment rate', 'Employment Rate (%) World Map'">Employment Rate (%) World Map</option>
            <option value="'Long-term unemployment rate', 'Long-term unemployment rate (%) World Map'">Long-term unemployment rate (%) World Map</option>
            <option value="'Labour market insecurity', 'Labour market insecurity (%) World Map'">Labour market insecurity (%) World Map</option>
            <option value="'Student skills', 'Student Skills (PISA) World Map'">Student Skills (PISA) World Map</option>
            <option value="'Life satisfaction', 'Life Satisfaction (0 - 10, Cantril Ladder) World Map'">Life Satisfaction (0 - 10, Cantril Ladder) World Map</option>
            <option value="'Life expectancy', 'Life expectancy (years) World Map'">Life expectancy (years) World Map</option>
            <option value="'Personal earnings', 'Personal Earnings (annual, US Dollar) World Map'">Personal Earnings (annual, US Dollar) World Map</option>
            <option value="'Air pollution', 'Air pollution (micrograms per cubic metre) World Map'">Air Pollution (MICRO_M3) World Map</option>
            <option value="'Water quality', 'Water quality (%) World Map'">Water quality (%) World Map</option>
            <option value="'Housing expenditure', 'Housing expenditure (%) World Map'">Housing expenditure (%) World Map</option>
            <option value="'Household net adjusted disposable income', 'Household net adjusted disposable income (annual, US Dollar) World Map'">Household net adjusted disposable income (annual, US Dollar) World Map</option>
            <option value="'Household net financial wealth', 'Household net financial wealth (annual, US Dollar) World Map'">Household net financial wealth (annual, US Dollar) World Map</option>
            <option value="'Educational attainment', 'Educational attainment (%) World Map'">Educational attainment (%) World Map</option>
            <option value="'Years in education', 'Years in education (years) World Map'">Years in education (years) World Map</option>
            <option value="'Voter turnout', 'Voter turnout (%) World Map'">Voter turnout (%) World Map</option>
            <option value="'Self-reported health', 'Self-reported health (%) World Map'">Self-reported health (%) World Map</option>
            <option value="'Employees working very long hours', 'Employees working very long hours (%) World Map'">Employees working very long hours (%) World Map</option>
            <option value="'Time devoted to leisure and personal care', 'Time devoted to leisure and personal care (hours/day) World Map'">Time devoted to leisure and personal care (hours/day) World Map</option>
            <option value="'Dwellings without basic facilities', 'Dwellings without basic facilities (%) World Map'">Dwellings without basic facilities (%) World Map</option>
            <option value="'Rooms per person', 'Rooms per person (ratio) World Map'">Rooms per person (ratio) World Map</option>
            <option value="'Stakeholder engagement for developing regulations', 'Stakeholder engagement for developing regulations (score) World Map'">Stakeholder engagement for developing regulations (score) World Map</option>


// change endpoints of the regression line if y2 is lower than minimal y-axis value
  if (y2 < d3.min(ySeries))
  {
    y2 = d3.min(ySeries);
    x2 = (d3.min(ySeries) - leastSquaresCoeff.intercept) / leastSquaresCoeff.slope;
  }

svg.selectAll(".dot")
	.data(data)
	.enter().append("circle")
	.attr("id", function(d) { return (d.CountryCode); })
	.attr("name", function(d) { return (d.CountryName); })
	.attr("r", 3.5)
	.attr("cx", function(d) { return x(d.GDP); })
	.attr("cy", function(d) { return y(d.Variable); })
	.on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", 1)
               .style("color", "white")
          tooltip.html(d["CountryName"] + "<br/> GDP: <span style='color:red'> " + "$" + xValue(d)
	        + "</span><br>"  +tiptext + ": <span style='color:red'> " + yValue(d) + "</span><br>")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });




  // define tooltip
  var tooltip = main.append("div")
      .attr('class', 'd3-tip')
      .style("opacity", 0);



en de css:

.d3-tip {
  line-height: 15px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 6px;
}

.d3-tip:after {
  box-sizing: border-box;
  display: inline;
  font-size: 10px;
  width: 100%;
  line-height: 1;
  color: rgba(0, 0, 0, 0.8);
  content: "\25BC";
  position: absolute;
  text-align: center;
}

.d3-tip.n:after {
  margin: -1px 0 0 0;
  top: 100%;
  left: 0;
}
