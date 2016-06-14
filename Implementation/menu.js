/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */


// click on map Employment
function getMap(variable, title)
{
 d3.select('#graphStuSkillEmploy').style('display', 'none');
 d3.select('#scatterplot').selectAll("*").remove();
 d3.select('#scatterplot').style('display', 'none');
 d3.select('#worldMap').style('display', '');
 d3.select('#barchart').style('display', 'none');
 d3.selectAll('.d3-tip').remove();

 // add title
 d3.select('#worldMap').html("<br><b>" + title + "<br><b>");
 createMap(variable);
}


// click on graph Student Skills - Employment Rate
function graphStuSkillEmploy()
{
  d3.select('#graphStuSkillEmploy').style('display', '');
  d3.select('#scatterplot').selectAll("*").remove();
  d3.select('#scatterplot').style('display', 'none');
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldMap').style('display', 'none');
  d3.selectAll('.d3-tip').remove();
}


// click on a combination of BLI variables to plot
function plotVariables(variableX, variableY, unitX, unitY)
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#scatterplot').selectAll("*").remove();
  d3.select('#scatterplot').style('display', '');
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldMap').style('display', 'none');
  d3.selectAll('.d3-tip').remove();

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
              variableY: undefined,
              country: d.country
            });
        }
    });

    // replace undefined value
    data.forEach(function(d) {
        if (d.indicator == variableY)
        {
            plotObject.forEach(function(dPlot) {
              if (dPlot.country == d.country)
              {
                dPlot.variableY = +d.Value;
              }
            });
        }
    });

    // delete country variable
    /*
    plotObject.forEach(function(dPlot) {
      delete dPlot.country;
    });
    */

    // sort the x-axis ascendingly
    plotObject.sort(function(x, y)
    {
        return d3.ascending(x.variableX, y.variableX);
    });

    // draw scatterplot
    createPlot(plotObject, textX, textY);
  });
}


// click on a combination of BLI and field variables to plot
function plotVariablesMultiData(variableX, variableY, unitX, unitY)
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#scatterplot').selectAll("*").remove();
  d3.select('#scatterplot').style('display', '');
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldMap').style('display', 'none');
  d3.selectAll('.d3-tip').remove();

  // define texts
  textX = variableX + unitX;
  textY = variableY + unitY;

  // add title
  d3.select('#scatterplot').html("<br><b>Plot of " + textX + " against " + textY + "</b></br>");

  // load the data
  d3_queue.queue()
   .defer(d3.json, "BLI_info.json")
   .defer(d3.json, "fields_grad_info.json")
   .await(function(error, file1, file2) {
      if (error) throw error("Error: the files did not load!");
      file1 = file1.points;
      file2 = file2.points;

    // extract relevant variables from loaded dataset and insert into a newly defined object
    plotObject = [];
    file1.forEach(function(d) {
        if (d.indicator == variableX)
        {
            plotObject.push(
            {
              variableX: +d.Value,
              variableY: undefined,
              country: d.country
            });
        }
    });

    // replace undefined value
    file2.forEach(function(d) {
        if (d.field == variableY)
        {
            plotObject.forEach(function(dPlot) {
              if (dPlot.country == d.country)
              {
                dPlot.variableY = +d.Value;
              }
            });
        }
    });

    // sort the x-axis ascendingly
    plotObject.sort(function(x, y)
    {
        return d3.ascending(x.variableX, y.variableX);
    });

    // delete objects with invalid/outlier y-values
    for(var i = 0; i < plotObject.length; i++)
    {
      if (plotObject[i].variableY == 0 || plotObject[i].variableY == NaN || plotObject[i].variableY == undefined)
      {
        plotObject.splice(i, 1);
        i--;
      }
    }

    // draw scatterplot
    createPlot(plotObject, textX, textY);
  });
}
