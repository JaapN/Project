/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

// click on map Student Skills
function getMapStuSkill()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  $("#scatterplot").empty();
  d3.select('#scatterplot').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', '');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
}

// click on map Employment
function getMapEmploy()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  $("#scatterplot").empty();
  d3.select('#scatterplot').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', '');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
}

// click on map Life Satisfaction
function getMapSatisf()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  $("#scatterplot").empty();
  d3.select('#scatterplot').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', '');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
}

// click on map Personal Earnings
function getMapPerEarn()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  $("#scatterplot").empty();
  d3.select('#scatterplot').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', '');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
}

// click on graph Student Skills - Employment Rate
function graphStuSkillEmploy()
{
  d3.select('#graphStuSkillEmploy').style('display', '');
  $("#scatterplot").empty();
  d3.select('#scatterplot').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
}

// click on a combination of variables to plot
function plotVariables(variableX, variableY, textX, textY)
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#scatterplot').style('display', '');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  $("#scatterplot").empty();

  // add title
  d3.select('#scatterplot').html("<br><b>Plot of " + textX + " against " + textY + "</b></br>");

  // load the data
  d3.json("BLI_info.json",
  function(error, data) {
    if (error) throw error("Error: the files did not load!");
    data = data.points;

    // extract relevant variables from loaded dataset
    plotObject = [];
    data.forEach(function(d) {
        if (d.indicator == variableX)
        {
            plotObject.push(
            {
              varX: d.Value,
              varY: undefined
            });
        }
    });

    // replace undefined value
    counter = 0;
    data.forEach(function(d) {
        if (d.indicator == variableY)
        {
            plotObject[counter].varY = d.Value;
            counter++;
        }
    });

    // convert data into series (arrays) and call createPlot
    var xSeries = plotObject.map(function(d) { return parseFloat(+d.varX); });
    var ySeries = plotObject.map(function(d) { return parseFloat(+d.varY); });
    createPlot(xSeries, ySeries, textX, textY);
  });
}

// click on plot Student Skills - Employment Rate
function plotStuSkillEmploy()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#scatterplot').style('display', '');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  $("#scatterplot").empty();

  // add title
  d3.select('#scatterplot').html("<br><b>Plot of Student Skills (PISA score) against Employment Rate (%)</b></br>");

  // load the data
  d3.json("BLI_info.json",
  function(error, data) {
    if (error) throw error("Error: the files did not load!");
    data = data.points;

    // extract relevant variables from loaded dataset
    plotObject = [];
    data.forEach(function(d) {
        if (d.indicator == "Employment rate")
        {
            plotObject.push(
            {
              Employ: d.Value,
              StuSkill: undefined
            });
        }
    });

    // replace undefined value
    counter = 0;
    data.forEach(function(d) {
        if (d.indicator == "Student skills")
        {
            plotObject[counter].StuSkill = d.Value;
            counter++;
        }
    });

    // convert data into series (arrays) and call createPlot
    var xSeries = plotObject.map(function(d) { return parseFloat(+d.StuSkill); });
    var ySeries = plotObject.map(function(d) { return parseFloat(+d.Employ); });
    createPlot(xSeries, ySeries, "Student skills (PISA)", "Employment rate (%)");
  });
}

// click on plot Student Skills - Personal Earnings
function plotStuSkillPerEarn()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  $("#scatterplot").empty();
  d3.select('#scatterplot').style('display', '');

  // add title
  d3.select('#scatterplot').html("<br><b>Plot of Student Skills (PISA score) against Personal Earnings (USD, annual)</b></br>");

  // load the data
  d3.json("BLI_info.json",
  function(error, data) {
    if (error) throw error("Error: the files did not load!");
    data = data.points;

    // extract relevant variables from loaded dataset
    plotObject = [];
    data.forEach(function(d) {
        if (d.indicator == "Personal earnings")
        {
            plotObject.push(
            {
              PerEarn: d.Value,
              StuSkill: undefined
            });
        }
    });

    // replace undefined value
    counter = 0;
    data.forEach(function(d) {
        if (d.indicator == "Student skills")
        {
            plotObject[counter].StuSkill = d.Value;
            counter++;
        }
    });

    // convert data into series (arrays) and call createPlot
    var xSeries = plotObject.map(function(d) { return parseFloat(+d.StuSkill); });
    var ySeries = plotObject.map(function(d) { return parseFloat(+d.PerEarn); });
    createPlot(xSeries, ySeries, "Student skills (PISA)", "Personal earnings (USD, annual)");
  });
}

// click on plot Student Skills - Life Satisfaction
function plotStuSkillSatisf()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  $("#scatterplot").empty();
  d3.select('#scatterplot').style('display', '');

  // add title
  d3.select('#scatterplot').html("<br><b>Plot of Student Skills (PISA score) against Life Satisfaction (0 - 10, Cantril Ladder)</b></br>");

  // load the data
  d3.json("BLI_info.json",
  function(error, data) {
    if (error) throw error("Error: the files did not load!");
    data = data.points;

    // extract relevant variables from loaded dataset
    plotObject = [];
    data.forEach(function(d) {
        if (d.indicator == "Life satisfaction")
        {
            plotObject.push(
            {
              Satisf: d.Value,
              StuSkill: undefined
            });
        }
    });

    // replace undefined value
    counter = 0;
    data.forEach(function(d) {
        if (d.indicator == "Student skills")
        {
            plotObject[counter].StuSkill = d.Value;
            counter++;
        }
    });

    // convert data into series (arrays) and call createPlot
    var xSeries = plotObject.map(function(d) { return parseFloat(+d.StuSkill); });
    var ySeries = plotObject.map(function(d) { return parseFloat(+d.Satisf); });
    createPlot(xSeries, ySeries, "Student skills (PISA)", "Life satisfaction (0 - 10, Cantril Ladder))");
  });
}

// click on plot Life Satisfaction - Personal Earnings
function plotSatisfPerEarn()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  $("#scatterplot").empty();
  d3.select('#scatterplot').style('display', '');

  // add title
  d3.select('#scatterplot').html("<br><b>Plot of Life Satisfaction (0 - 10, Cantril Ladder) against Personal Earnings (USD, annual))</b></br>");

  // load the data
  d3.json("BLI_info.json",
  function(error, data) {
    if (error) throw error("Error: the files did not load!");
    data = data.points;

    // extract relevant variables from loaded dataset
    plotObject = [];
    data.forEach(function(d) {
        if (d.indicator == "Personal earnings")
        {
            plotObject.push(
            {
              PerEarn: d.Value,
              Satisf: undefined
            });
        }
    });

    // replace undefined value
    counter = 0;
    data.forEach(function(d) {
        if (d.indicator == "Life satisfaction")
        {
            plotObject[counter].Satisf = d.Value;
            counter++;
        }
    });

    // convert data into series (arrays) and call createPlot
    var xSeries = plotObject.map(function(d) { return parseFloat(+d.Satisf); });
    var ySeries = plotObject.map(function(d) { return parseFloat(+d.PerEarn); });
    createPlot(xSeries, ySeries, "Life satisfaction (0 - 10, Cantril Ladder)", "Personal earnings (USD, annual)");
  });
}

// click on plot Employment Rate - Life Satisfaction
function plotEmploySatisf()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  $("#scatterplot").empty();
  d3.select('#scatterplot').style('display', '');

  // add title
  d3.select('#scatterplot').html("<br><b>Plot of Employment Rate (%) against Life Satisfaction (0 - 10, Cantril Ladder)</b></br>");

  // load the data
  d3.json("BLI_info.json",
  function(error, data) {
    if (error) throw error("Error: the files did not load!");
    data = data.points;

    // extract relevant variables from loaded dataset
    plotObject = [];
    data.forEach(function(d) {
        if (d.indicator == "Life satisfaction")
        {
            plotObject.push(
            {
              Satisf: d.Value,
              Employ: undefined
            });
        }
    });

    // replace undefined value
    counter = 0;
    data.forEach(function(d) {
        if (d.indicator == "Employment rate")
        {
            plotObject[counter].Employ = d.Value;
            counter++;
        }
    });

    // convert data into series (arrays) and call createPlot
    var xSeries = plotObject.map(function(d) { return parseFloat(+d.Employ); });
    var ySeries = plotObject.map(function(d) { return parseFloat(+d.Satisf); });
    createPlot(xSeries, ySeries, "Employment rate (%)", "Life satisfaction (0 - 10, Cantril Ladder)");
  });
}
