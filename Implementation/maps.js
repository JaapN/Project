/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

// load the files
d3_queue.queue()
  .defer(d3.json, "BLI_info.json")
  .defer(d3.json, "fields_grad_info.json")
  .await(function(error, file1, file2) {
  if (error) throw error("Error: the files did not load!");
  file1 = file1.points;
  file2 = file2.points;

  /*
   * Draw the world map by student skills
   */
  // create a new object of the loaded data
  DatamapObject = {};
  file1.forEach(function(d) {
    if (d.indicator == "Student skills")
    {
      DatamapObject[d.location] =
      {
        fillKey: colorDataStuSkill(d.Value),
        name: d.location,
        country: d.country,
        indicator: d.indicator,
        student_skills: d.Value,
        unit: d.unit
      };
    }
  });

  // the student skill map
  $("#worldStuSkillMap").datamap({
     scope: 'world',
     geography_config: {
       backgroundColor: '#006994',
       borderColor: 'rgba(0,0,0,0.5)',
       highlightBorderColor: 'rgba(0,255,255,1)',
       popupTemplate: _.template([
         '<div class="hoverinfo">',
         '<strong><%= geography.properties.name %></strong>',
         '<% if (data.name) { %>, <strong> <%= data.name %></strong><br/><% } %>',
         '<% if (data.student_skills) { %> PISA avg. score: <%= data.student_skills %><br/> <% } %>',
         '</div>'
        ].join('') )
     },
     fills: {
       defaultFill: '#808080',
       veryLow: '#f2f0f7',
       Low: '#cbc9e2',
       Medium: '#9e9ac8',
       High: '#756bb1',
       veryHigh: '#54278f'
     },
     data: DatamapObject
   });
   // add interactivity to the maps
   $("#worldStuSkillMap").on('map-click', function(event, data) {
       alert( "Clicked on: " + data.geography.id + "\n" + "\n" +
       "Country name: " + data.data.country + "\n" +
       "Code: " + data.data.name + "\n" +
       data.data.indicator + " (PISA score): " + data.data.student_skills + "\n" +
       "Relative ranking: " + data.data.fillKey + "\n"
      ); // alerts about which country you clicked on
      // create barchart for selected country
      getBarchart(data.data.country);
   });

  /*
   * Draw the world map by employment
   */
  // create a new object of the loaded data
  DatamapObject = {};
  file1.forEach(function(d) {
    if (d.indicator == "Employment rate")
    {
      DatamapObject[d.location] =
      {
        fillKey: colorDataEmploy(d.Value),
        name: d.location,
        country: d.country,
        indicator: d.indicator,
        employment: d.Value,
        unit: d.unit
      };
    }
  });

  // the employment rate map
  $("#worldEmployMap").datamap({
     scope: 'world',
     geography_config: {
       backgroundColor: '#006994',
       borderColor: 'rgba(0,0,0,0.5)',
       highlightBorderColor: 'rgba(0,255,255,1)',
       popupTemplate: _.template([
         '<div class="hoverinfo">',
         '<strong><%= geography.properties.name %></strong>',
         '<% if (data.name) { %>, <strong> <%= data.name %></strong><br/><% } %>',
         '<% if (data.employment) { %> Employment rate (%): <%= data.employment %><br/> <% } %>',
         '</div>'
        ].join('') )
     },
     fills: {
       defaultFill: '#808080',
       veryLow: '#f2f0f7',
       Low: '#cbc9e2',
       Medium: '#9e9ac8',
       High: '#756bb1',
       veryHigh: '#54278f'
     },
     data: DatamapObject
   });
   // add interactivity to the maps
   $("#worldEmployMap").on('map-click', function(event, data) {
       alert( "Clicked on: " + data.geography.id + "\n" + "\n" +
       "Country name: " + data.data.country + "\n" +
       "Code: " + data.data.name + "\n" +
       data.data.indicator + " (%): " + data.data.employment + "\n" +
       "Relative ranking: " + data.data.fillKey + "\n"
      ); // alerts about which country you clicked on
      // create barchart for selected country
      getBarchart(data.data.country);
   });

   /*
    * Draw the world map by satisfaction
    */
   // create a new object of the loaded data
   DatamapObject = {};
   file1.forEach(function(d) {
     if (d.indicator == "Life satisfaction")
     {
       DatamapObject[d.location] =
       {
         fillKey: colorDataSatisf(d.Value),
         name: d.location,
         country: d.country,
         indicator: d.indicator,
         satisfaction: d.Value,
         unit: d.unit
       };
     }
   });

   // the life satisfaction map
   $("#worldSatisfMap").datamap({
      scope: 'world',
      geography_config: {
        backgroundColor: '#006994',
        borderColor: 'rgba(0,0,0,0.5)',
        highlightBorderColor: 'rgba(0,255,255,1)',
        popupTemplate: _.template([
          '<div class="hoverinfo">',
          '<strong><%= geography.properties.name %></strong>',
          '<% if (data.name) { %>, <strong> <%= data.name %></strong><br/><% } %>',
          '<% if (data.satisfaction) { %> Life Satisfaction (0 - 10): <%= data.satisfaction %><br/> <% } %>',
          '</div>'
         ].join('') )
      },
      fills: {
        defaultFill: '#808080',
        veryLow: '#f2f0f7',
        Low: '#cbc9e2',
        Medium: '#9e9ac8',
        High: '#756bb1',
        veryHigh: '#54278f'
      },
      data: DatamapObject
    });
    // add on-click event
    $("#worldSatisfMap").on('map-click', function(event, data) {
        alert( "Clicked on: " + data.geography.id + "\n" + "\n" +
        "Country name: " + data.data.country + "\n" +
        "Code: " + data.data.name + "\n" +
        data.data.indicator + " (0 - 10): " + data.data.satisfaction + "\n" +
        "Relative ranking: " + data.data.fillKey + "\n"
       ); // alerts about which country you clicked on
       // create barchart for selected country
       getBarchart(data.data.country);
    });

   /*
    * Draw the world map by personal earnings
    */
    // create a new object of the loaded data
    DatamapObject = {};
    file1.forEach(function(d) {
      if (d.indicator == "Personal earnings")
      {
        DatamapObject[d.location] =
        {
          fillKey: colorDataPerEarn(d.Value),
          name: d.location,
          country: d.country,
          indicator: d.indicator,
          pEarnings: d.Value,
          unit: d.unit
        };
      }
    });

    // the personal earnings map
    $("#worldPerEarnMap").datamap({
       scope: 'world',
       geography_config: {
         backgroundColor: '#006994',
         borderColor: 'rgba(0,0,0,0.5)',
         highlightBorderColor: 'rgba(0,255,255,1)',
         popupTemplate: _.template([
           '<div class="hoverinfo">',
           '<strong><%= geography.properties.name %></strong>',
           '<% if (data.name) { %>, <strong> <%= data.name %></strong><br/><% } %>',
           '<% if (data.pEarnings) { %> Personal earnings (USD): <%= data.pEarnings %><br/> <% } %>',
           '</div>'
          ].join('') )
       },
       fills: {
         defaultFill: '#808080',
         veryLow: '#f2f0f7',
         Low: '#cbc9e2',
         Medium: '#9e9ac8',
         High: '#756bb1',
         veryHigh: '#54278f'
       },
       data: DatamapObject
     });
     // add on-click event
     $("#worldPerEarnMap").on('map-click', function(event, data) {
         alert( "Clicked on: " + data.geography.id + "\n" + "\n" +
         "Country name: " + data.data.country + "\n" +
         "Code: " + data.data.name + "\n" +
         data.data.indicator + " (US Dollar): " + data.data.pEarnings + "\n" +
         "Relative ranking: " + data.data.fillKey + "\n"
        ); // alerts about which country you clicked on
        // create barchart for selected country
        getBarchart(data.data.country);
     });

     /*
      * Set css for all visualisations (maps, plots and graphs) on display:none
      */
     d3.select("#graphStuSkillEmploy").style('display', "none");
     d3.select("#scatterplot").style('display', "none");
     d3.select("#worldStuSkillMap").style('display', "none");
     d3.select("#worldEmployMap").style("display", "none");
     d3.select("#worldSatisfMap").style("display", "none");
     d3.select("#worldPerEarnMap").style("display", "none");
 });

 /* This function receives 'Student Skills (PISA score)' data input and returns the appropriate colour,
    depending on the respective country's average student skill score */
 function colorDataStuSkill(StuSkill)
 {
   // get color for the data
   if (StuSkill < 450)
   {
     return 'veryLow';
   }
   else if (StuSkill < 480)
   {
     return 'Low';
   }
   else if (StuSkill < 500)
   {
     return 'Medium';
   }
   else if (StuSkill < 515)
   {
     return 'High';
   }
   else if (StuSkill >= 515)
   {
     return 'veryHigh';
   }
 }

 /* This function receives 'Employement Rate (%)' data input and returns the appropriate colour,
    depending on the respective country's employment rate */
 function colorDataEmploy(Employ)
 {
   // get color for the data
   if (Employ < 55)
   {
     return 'veryLow';
   }
   else if (Employ < 65)
   {
     return 'Low';
   }
   else if (Employ < 70)
   {
     return 'Medium';
   }
   else if (Employ < 75)
   {
     return 'High';
   }
   else if (Employ >= 75)
   {
     return 'veryHigh';
   }
 }

 /* This function receives 'Life Satisfaction (0-10)' data input and returns the appropriate colour,
    depending on the respective country's average life satisfaction */
 function colorDataSatisf(Satisf)
 {
   // get color for the data
   if (Satisf < 5.5)
   {
     return 'veryLow';
   }
   else if (Satisf < 6)
   {
     return 'Low';
   }
   else if (Satisf < 7)
   {
     return 'Medium';
   }
   else if (Satisf < 7.4)
   {
     return 'High';
   }
   else if (Satisf >= 7.4)
   {
     return 'veryHigh';
   }
 }

 /* This function receives 'Personal Earnings (USD)' data input and returns the appropriate colour,
    depending on the respective country's average annual personal earnings */
 function colorDataPerEarn(PerEarn)
 {
   // get color for the data
   if (PerEarn < 15000)
   {
     return 'veryLow';
   }
   else if (PerEarn < 25000)
   {
     return 'Low';
   }
   else if (PerEarn < 40000)
   {
     return 'Medium';
   }
   else if (PerEarn < 50000)
   {
     return 'High';
   }
   else if (PerEarn >= 50000)
   {
     return 'veryHigh';
   }
 }
