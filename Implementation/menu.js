/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

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
function plotVariables(variableX, variableY, unitX, unitY)
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

  // define texts
  textX = variableX + unitX;
  textY = variableY + unitY;

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
