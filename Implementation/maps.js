/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

/* Draw the map */
function createMap(variable)
{
  // load the files
  d3.json("BLI_info.json",
    function(error, data) {
    if (error) throw error("Error: the files did not load!");
    data = data.points;

    /*
     * Draw the world map by employment
     */
    // convert variable series to an array
    varSeries = [];
    data.forEach(function(d) {
      if (d.indicator == variable)
      {
        varSeries.push(parseFloat(+d.Value));
      }
    });
    // sort series
    varSeries.sort();

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

    // the employment rate map
    var worldDatamap = new Datamap({
       element: document.getElementById("worldMap"),
       scope: 'world',
       done: function(datamap) {
         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
           getBarchart(geography.properties.name);
         });
       },
       geographyConfig: {
         backgroundColor: '#006994',
         borderColor: 'rgba(0,0,0,0.5)',
         highlightBorderColor: 'rgba(255,0,255,1)',
         popupTemplate: function(geography, data) {
             if (data)
             {
               return ['<div class="hoverinfo">'
               + '<strong>' + geography.properties.name + ', ' + data.name + '</strong><br/>'
               + data.indicator + ' (' + data.unit + '): ' + data.value + '<br/></div>'];
             }
             else
             {
               return ['<div class="hoverinfo">'
               + '<strong>' + geography.properties.name + '</strong></div>'];
             }
             /*
             '<% if (data.name) { %>, <strong> <%= data.name %></strong><br/><% } %>',
             '<% if (data.value) { %> <%= data.indicator %> (<%= data.unit %>): <%= data.value %><br/> <% } %>',
             '</div>'].join('');
             */
         }
       },
       fills: {
         defaultFill: '#eeeeee',
         extremelyLow: '#ccece6',
         veryLow: '#99d8c9',
         Low: '#66c2a4',
         Medium: '#41ae76',
         High: '#238b45',
         veryHigh: '#006d2c',
         extremelyHigh: '#00441b'
       },
       data: datamapObject
     });

     // add a legend
     worldDatamap.legend({
      legendTitle : "Legend",
      defaultFillName: "No Data:",
      labels: {
        extremelyLow: 'Extremely low:',
        veryLow: 'Very low:',
        Low: 'Low:',
        Medium: 'Medium:',
        High: 'High:',
        veryHigh: 'Very high:',
        extremelyHigh: 'Extremely high:'
      }
    });
  });
}

/* This function receives BLI data input and returns the appropriate colour,
   depending on the respective country's average value,
   and the distribution of the respective input variable for all countries. */
function colorData(input, series)
{
  // get color for the data
  if (input < series[2 * Math.round(series.length / 20)])
  {
    return 'extremelyLow';
  }
  else if (input < series[5 * Math.round(series.length / 20)])
  {
   return 'veryLow';
  }
  else if (input < series[8 * Math.round(series.length / 20)])
  {
    return 'Low';
  }
  else if (input < series[12 * Math.round(series.length / 20)])
  {
    return 'Medium';
  }
  else if (input < series[15 * Math.round(series.length / 20)])
  {
   return 'High';
  }
  else if (input < series[18 * Math.round(series.length / 20)])
  {
   return 'veryHigh';
  }
  else if (input >= series[18 * Math.round(series.length / 20)])
  {
   return 'extremelyHigh';
  }
}
