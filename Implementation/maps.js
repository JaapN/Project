/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

/* Draw the map */
function createMap(varSeries, datamapObject)
{
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
       highlightFillColor: 'default',
       highlightBorderColor: 'rgba(255,0,0,1)',
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
       }
     },
     fills: {
       defaultFill: '#e0e0e0',
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

   // define label variables for legend
   labelDefault = 'Missing Data:';
   labelExtLow = 'Extremely low (lower than ' + varSeries[2 * Math.round(varSeries.length / 20)] + "):";
   labelVeryLow = 'Very low (' + varSeries[2 * Math.round(varSeries.length / 20)] + ' - ' + (varSeries[5 * Math.round(varSeries.length / 20)]) + "):";
   labelLow = 'Low (' + varSeries[5 * Math.round(varSeries.length / 20)] + ' - ' + (varSeries[8 * Math.round(varSeries.length / 20)]) + "):";
   labelMedium = 'Medium (' + varSeries[8 * Math.round(varSeries.length / 20)] + ' - ' + (varSeries[12 * Math.round(varSeries.length / 20)]) + "):";
   labelHigh = 'High (' + varSeries[12 * Math.round(varSeries.length / 20)] + ' - ' + (varSeries[15 * Math.round(varSeries.length / 20)]) + "):";
   labelVeryHigh = 'Very high (' + varSeries[15 * Math.round(varSeries.length / 20)] + ' - ' + (varSeries[18 * Math.round(varSeries.length / 20)]) + "):";
   labelExtHigh = 'Extremely high (higher than/equal as ' + varSeries[18 * Math.round(varSeries.length / 20)] + "): ";

   // add legend
   worldDatamap.legend({
    legendTitle: "",
    defaultFillName: labelDefault,
    labels: {
      extremelyLow: labelExtLow,
      veryLow: labelVeryLow,
      Low: labelLow,
      Medium: labelMedium,
      High: labelHigh,
      veryHigh: labelVeryHigh,
      extremelyHigh: labelExtHigh,
    }
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
