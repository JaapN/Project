/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

// click on World Datamaps
function getMap(input)
{
  // convert input to two variables
  var split = input.split(",");
  var variable = split[0];
  var title = split[1];

  // hide/clear all visualisations but the selected one
  d3.select('#graph').selectAll("*").remove();
  d3.select('#graph').style('display', 'none');
  d3.select('#scatterplot').selectAll("*").remove();
  d3.select('#scatterplot').style('display', 'none');
  d3.select('#worldMap').style('display', '');
  d3.select('#barchart').style('display', 'none');
  d3.selectAll('.d3-tip').remove();

  // change colours of the buttons
  d3.select("#datamapsBtn").style("background-color", "red");
  d3.select("#plotBtnBLIBLI").style("background-color", "#4CAF50");
  d3.select("#plotBtnBLIField").style("background-color", "#4CAF50");
  d3.select("#graphBtnBLIBLI").style("background-color", "#4CAF50");
  d3.select("#graphBtnBLIField").style("background-color", "#4CAF50");

  // add title
  d3.select('#worldMap').html("<br><b>" + title + "<br><b>");

  // load the file
  d3.json("BLI_info.json",
  function(error, data) {
    if (error) throw error("Error: the files did not load!");
    data = data.points;

    // convert variable series to an array
    varSeries = [];
    data.forEach(function(d) {
     if (d.indicator == variable)
     {
       varSeries.push(parseFloat(+d.Value));
     }
    });

    // sort series
    varSeries.sort(function(a,b) { return a - b;});

    // create a new object of the loaded data
    datamapObject = {};
    data.forEach(function(d) {
     if (d.indicator == variable)
     {
       datamapObject[d.location] =
       {
         fillKey: colorData(+d.Value, varSeries),
         name: d.location,
         country: d.country,
         indicator: d.indicator,
         value: +d.Value,
         unit: d.unit
       };
     }
    });

    // create world map for selected variable
    createMap(varSeries, datamapObject);
    });
}



// click on a country of a World Datamap
function getBarchart(country)
{
  // clear the previous barchart
  d3.select('#barchart').selectAll("*").remove();
  d3.selectAll('.d3-tip').remove();

  // load the data
  d3.json('fields_grad_info.json',
  function(error, data) {
    if (error) throw error("Error: the file did not load!");
    data = data.points;

    // extract the relevant variables to a newly defined object
    barchartObject = [];
    data.forEach(function(d) {
      if (d.country == country)
      {
          barchartObject.push(
          {
            Country: d.Value,
            field: d.field
          });
      }
    });

    // add averages for every field to barchartObject (see field_averages.js)
    barchartObject.forEach(function(d) {
      for (var i = 0; i < allFields.length; i++)
      {
        if (allFields[i] == d.field)
        {
          d.Average = fieldAverages[allFields[i]];
        }
      }
    });

    // get group names (country and average)
    var groupNames = d3.keys(barchartObject[0]).filter(function(key) { return key !== "field"; });

    /*
     * Convert current variables per object into new objects part of the new array d.groups
     *
     * d.groups is a new variable (array) not unlike d.percentage, d.average and d.field
     * The array contains two object: an object for the averages and an object for the respective country
     * Both objects contain the name and value/percentage and are stored in barchartObject
     */
    barchartObject.forEach(function(d) {
      d.groups = groupNames.map(function(name) { return {name: name, percentage: +d[name]}; });
    });

    // create barchart for the respective country, object and groupNames
    createBarchart(country, barchartObject, groupNames);
  });
}



// click on a combination of BLI variables to plot with createPlot
function plotVariables()
{
  // hide/clear all visualisations but the selected one
  d3.select('#graph').selectAll("*").remove();
  d3.select('#graph').style('display', 'none');
  d3.select('#scatterplot').selectAll("*").remove();
  d3.select('#scatterplot').style('display', '');
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldMap').style('display', 'none');
  d3.selectAll('.d3-tip').remove();

  // change colours of the buttons
  d3.select("#datamapsBtn").style("background-color", "#4CAF50");
  d3.select("#plotBtnBLIBLI").style("background-color", "red");
  d3.select("#plotBtnBLIField").style("background-color", "#4CAF50");
  d3.select("#graphBtnBLIBLI").style("background-color", "#4CAF50");
  d3.select("#graphBtnBLIField").style("background-color", "#4CAF50");

  // load the data
  d3.json("BLI_info.json",
  function(error, data) {
    if (error) throw error("Error: the files did not load!");
    data = data.points;

    // get X and Y indicators/variables from the selectmenus in the dropdown
    variableX = d3.select('#varX').node().value;
    variableY = d3.select('#varY').node().value;

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
            // get X-variable's unit
            unitX = ' (' + d.unit + ')';
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
            // get Y-variable's unit
            unitY = ' (' + d.unit + ')';
        }
    });

    // define texts
    textX = variableX + unitX;
    textY = variableY + unitY;

    // add title
    d3.select('#scatterplot').html("<br><b>Plot of " + textX + " against " + textY + "</b></br>");

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
function plotVariablesMultiData()
{
  // hide/clear all visualisations but the selected one
  d3.select('#graph').selectAll("*").remove();
  d3.select('#graph').style('display', 'none');
  d3.select('#scatterplot').selectAll("*").remove();
  d3.select('#scatterplot').style('display', '');
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldMap').style('display', 'none');
  d3.selectAll('.d3-tip').remove();

  // change colours of the buttons
  d3.select("#datamapsBtn").style("background-color", "#4CAF50");
  d3.select("#plotBtnBLIBLI").style("background-color", "#4CAF50");
  d3.select("#plotBtnBLIField").style("background-color", "red");
  d3.select("#graphBtnBLIBLI").style("background-color", "#4CAF50");
  d3.select("#graphBtnBLIField").style("background-color", "#4CAF50");

  // load the data
  d3_queue.queue()
   .defer(d3.json, "BLI_info.json")
   .defer(d3.json, "fields_grad_info.json")
   .await(function(error, file1, file2) {
      if (error) throw error("Error: the files did not load!");
      file1 = file1.points;
      file2 = file2.points;

      // get X and Y indicators/variables from the selectmenus in the dropdown
      variableX = d3.select('#varXmulti').node().value;
      variableY = d3.select('#varYmulti').node().value;

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
              // get X-variable's unit
              unitX = ' (' + d.unit + ')';
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
              // get Y-variable's unit
              unitY = ' (' + d.unit + ')';
          }
      });

      // define texts
      textX = variableX + unitX;
      textY = variableY + unitY;

      // add title
      d3.select('#scatterplot').html("<br><b>Plot of " + textX + " against " + textY + "</b></br>");

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



// Graph: BLI - BLI
function getGraph()
{
  // hide/clear all visualisations but the selected one
  d3.select('#graph').selectAll("*").remove();
  d3.select('#graph').style('display', '');
  d3.select('#scatterplot').selectAll("*").remove();
  d3.select('#scatterplot').style('display', 'none');
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldMap').style('display', 'none');
  d3.selectAll('.d3-tip').remove();

  // change colours of the buttons
  d3.select("#datamapsBtn").style("background-color", "#4CAF50");
  d3.select("#plotBtnBLIBLI").style("background-color", "#4CAF50");
  d3.select("#plotBtnBLIField").style("background-color", "#4CAF50");
  d3.select("#graphBtnBLIBLI").style("background-color", "red");
  d3.select("#graphBtnBLIField").style("background-color", "#4CAF50");

  // load the data
  d3.json("BLI_info.json",
  function(error, data) {
    if (error) throw error("Error: the files did not load!");
    data = data.points;

    // get X and Y indicators/variables from the selectmenus in the dropdown
    variableX = d3.select('#graphX').node().value;
    variableY = d3.select('#graphY').node().value;

    // extract relevant variables from loaded dataset and insert into a newly defined object
    graphObject = [];
    data.forEach(function(d) {
        if (d.indicator == variableX)
        {
            graphObject.push(
            {
              variableX: +d.Value,
              variableY: undefined,
              country: d.country
            });
            // get X-variable's unit
            unitX = ' (' + d.unit + ')';
        }
    });

    // replace undefined value
    data.forEach(function(d) {
        if (d.indicator == variableY)
        {
            graphObject.forEach(function(dGraph) {
              if (dGraph.country == d.country)
              {
                dGraph.variableY = +d.Value;
              }
            });
            // get Y-variable's unit
            unitY = ' (' + d.unit + ')';
        }
    });

    // define texts
    textX = variableX + unitX;
    textY = variableY + unitY;

    // add title
    d3.select('#graph').html("<br><b>Graph of " + textX + " against " + textY + "</b></br>");

    // sort the x-axis ascendingly
    graphObject.sort(function(x, y)
    {
        return d3.ascending(x.variableX, y.variableX);
    });

    // draw scatterplot
    createGraph(graphObject, textX, textY);
  });
}



// Graph: BLI - Field
function getGraphMulti()
{
  // hide/clear all visualisations but the selected one
  d3.select('#graph').selectAll("*").remove();
  d3.select('#graph').style('display', '');
  d3.select('#scatterplot').selectAll("*").remove();
  d3.select('#scatterplot').style('display', 'none');
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldMap').style('display', 'none');
  d3.selectAll('.d3-tip').remove();

  // change colours of the buttons
  d3.select("#datamapsBtn").style("background-color", "#4CAF50");
  d3.select("#plotBtnBLIBLI").style("background-color", "#4CAF50");
  d3.select("#plotBtnBLIField").style("background-color", "#4CAF50");
  d3.select("#graphBtnBLIBLI").style("background-color", "#4CAF50");
  d3.select("#graphBtnBLIField").style("background-color", "red");

  // load the data
  d3_queue.queue()
   .defer(d3.json, "BLI_info.json")
   .defer(d3.json, "fields_grad_info.json")
   .await(function(error, file1, file2) {
      if (error) throw error("Error: the files did not load!");
      file1 = file1.points;
      file2 = file2.points;

      // get X and Y indicators/variables from the selectmenus in the dropdown
      variableX = d3.select('#graphXmulti').node().value;
      variableY = d3.select('#graphYmulti').node().value;

      // extract relevant variables from loaded dataset and insert into a newly defined object
      graphObject = [];
      file1.forEach(function(d) {
          if (d.indicator == variableX)
          {
              graphObject.push(
              {
                variableX: +d.Value,
                variableY: undefined,
                country: d.country
              });
              // get X-variable's unit
              unitX = ' (' + d.unit + ')';
          }
      });

      // replace undefined value
      file2.forEach(function(d) {
          if (d.field == variableY)
          {
              graphObject.forEach(function(dGraph) {
                if (dGraph.country == d.country)
                {
                  dGraph.variableY = +d.Value;
                }
              });
              // get Y-variable's unit
              unitY = ' (' + d.unit + ')';
          }
      });

      // define texts
      textX = variableX + unitX;
      textY = variableY + unitY;

      // add title
      d3.select('#graph').html("<br><b>Graph of " + textX + " against " + textY + "</b></br>");

      // sort the x-axis ascendingly
      graphObject.sort(function(x, y)
      {
          return d3.ascending(x.variableX, y.variableX);
      });

      // delete objects with invalid/outlier y-values
      for(var i = 0; i < graphObject.length; i++)
      {
        if (graphObject[i].variableY == 0 || graphObject[i].variableY == NaN || graphObject[i].variableY == undefined)
        {
          graphObject.splice(i, 1);
          i--;
        }
      }

      // draw scatterplot
      createGraph(graphObject, textX, textY);
  });
}
