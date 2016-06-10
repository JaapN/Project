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
    $("#worldMap").datamap({
       scope: 'world',
       /*
       done: function(datamap) {
         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
           alert(geography.properties.name);
         });
       },
       */
       geography_config: {
         backgroundColor: '#006994',
         borderColor: 'rgba(0,0,0,0.5)',
         highlightBorderColor: 'rgba(0,255,255,1)',
         popupTemplate: _.template([
           '<div class="hoverinfo">',
           '<strong><%= geography.properties.name %></strong>',
           '<% if (data.name) { %>, <strong> <%= data.name %></strong><br/><% } %>',
           '<% if (data.value) { %> <%= data.indicator %> (<%= data.unit %>): <%= data.value %><br/> <% } %>',
           '</div>'
          ].join('') )
       },
       fills: {
         defaultFill: '#808080',
         veryLow: '#ffffb2',
         Low: '#fecc5c',
         Medium: '#fd8d3c',
         High: '#f03b20',
         veryHigh: '#bd0026'
       },
       data: datamapObject
     });
     // add interactivity to the maps
     $("#worldMap").on('map-click', function(event, data) {
         /*
         alert( "Clicked on: " + data.geography.id + "\n" + "\n" +
         "Country name: " + data.data.country + "\n" +
         "Code: " + data.data.name + "\n" +
         data.data.indicator + " (" + data.data.unit + "): " + data.data.value + "\n" +
         "Relative ranking: " + data.data.fillKey + "\n"
        ); // alerts about which country you clicked on
        // create barchart for selected country
        */
        getBarchart(data.data.country);
     });
  });
}

/* This function receives BLI data input and returns the appropriate colour,
   depending on the respective country's average value,
   and the distribution of the respective input variable for all countries. */
function colorData(input, series)
{
  // get color for the data
  if (input < series[Math.round(series.length / 5)])
  {
    return 'veryLow';
  }
  else if (input < series[2 * Math.round(series.length / 5)])
  {
    return 'Low';
  }
  else if (input < series[3 * Math.round(series.length / 5)])
  {
    return 'Medium';
  }
  else if (input < series[4 * Math.round(series.length / 5)])
  {
   return 'High';
  }
  else if (input >= series[4 * Math.round(series.length / 5)])
  {
   return 'veryHigh';
  }
}
