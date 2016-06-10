/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

// click on map Employment
function getMap(variable, title)
{
 d3.select('#graphStuSkillEmploy').style('display', 'none');
 $("#scatterplot").empty();
 d3.select('#scatterplot').style('display', 'none');
 d3.select('#worldMap').style('display', '');
 $('#barchart').empty();
 d3.select('#barchart').style('display', 'none');

 // add title
 d3.select('#worldMap').html("<br><b>" + title + "<br><b>");
 createMap(variable);
}

// click on graph Student Skills - Employment Rate
function graphStuSkillEmploy()
{
  d3.select('#graphStuSkillEmploy').style('display', '');
  $("#scatterplot").empty();
  d3.select('#scatterplot').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldMap').style('display', 'none');
}

// click on a combination of variables to plot
function plotVariables(variableX, variableY, unitX, unitY)
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  $("#scatterplot").empty();
  d3.select('#scatterplot').style('display', '');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldMap').style('display', 'none');

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

    // extract relevant variables from loaded dataset and insert into a newly defined object
    plotObject = [];
    data.forEach(function(d) {
        if (d.indicator == variableX)
        {
            plotObject.push(
            {
              variableX: +d.Value,
              variableY: undefined
            });
        }
    });

    // replace undefined value
    counter = 0;
    data.forEach(function(d) {
        if (d.indicator == variableY)
        {
            plotObject[counter].variableY = +d.Value;
            counter++;
        }
    });

    // sort the x-axis ascendingly
    plotObject.sort(function(x, y)
    {
        return d3.ascending(x.variableX, y.variableX);
    });

    // draw scatterplot
    createPlot(plotObject, textX, textY);
  });
}
