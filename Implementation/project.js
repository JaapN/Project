/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

// click on map HPI
function getMapHPI()
{
  d3.select("#graph_WellB_LifeE").style('display', 'none');
  d3.select("#graph_GDP_FootP").style("display", "none");
  d3.select("#WorldFootMap").style("display", "none");
  d3.select("#WorldWellBMap").style("display", "none");
  d3.select("#WorldLifeEMap").style("display", "none");
  d3.select("#Table").style("display", "none");
  d3.select("#WorldHPIMap").style("display", "");
}

// click on map footprint
function getMapFoot()
{
  d3.select("#graph_WellB_LifeE").style('display', 'none');
  d3.select("#graph_GDP_FootP").style("display", "none");
  d3.select("#WorldHPIMap").style("display", "none");
  d3.select("#WorldWellBMap").style("display", "none");
  d3.select("#WorldLifeEMap").style("display", "none");
  d3.select("#Table").style("display", "none");
  d3.select("#WorldFootMap").style("display", "");
}

// click on map well-being
function getMapWellB()
{
  d3.select("#graph_WellB_LifeE").style('display', 'none');
  d3.select("#graph_GDP_FootP").style("display", "none");
  d3.select("#WorldHPIMap").style("display", "none");
  d3.select("#WorldFootMap").style("display", "none");
  d3.select("#WorldLifeEMap").style("display", "none");
  d3.select("#Table").style("display", "none");
  d3.select("#WorldWellBMap").style("display", "");
}

// click on map life expectancy
function getMapLifeE()
{
  d3.select("#graph_WellB_LifeE").style('display', 'none');
  d3.select("#graph_GDP_FootP").style("display", "none");
  d3.select("#WorldHPIMap").style("display", "none");
  d3.select("#WorldFootMap").style("display", "none");
  d3.select("#WorldWellBMap").style("display", "none");
  d3.select("#Table").style("display", "none");
  d3.select("#WorldLifeEMap").style("display", "");
}

// click on graph wellbeing - life expectancy
function graph_WellB_LifeE()
{
  d3.select("#WorldHPIMap").style("display", "none");
  d3.select("#graph_GDP_FootP").style("display", "none");
  d3.select("#WorldFootMap").style("display", "none");
  d3.select("#WorldWellBMap").style("display", "none");
  d3.select("#WorldLifeEMap").style("display", "none");
  d3.select("#Table").style("display", "none");
  d3.select("#graph_WellB_LifeE").style("display", "");
}

// click on graph gdp - foodprint
function graph_GDP_FootP()
{
  d3.select("#WorldHPIMap").style("display", "none");
  d3.select("#graph_WellB_LifeE").style("display", "none");
  d3.select("#WorldFootMap").style("display", "none");
  d3.select("#WorldWellBMap").style("display", "none");
  d3.select("#WorldLifeEMap").style("display", "none");
  d3.select("#Table").style("display", "none");
  d3.select("#graph_GDP_FootP").style("display", "");
}

// click on table
function showTable()
{
  d3.select("#graph_WellB_LifeE").style('display', 'none');
  d3.select("#graph_GDP_FootP").style("display", "none");
  d3.select("#WorldHPIMap").style("display", "none");
  d3.select("#WorldFootMap").style("display", "none");
  d3.select("#WorldWellBMap").style("display", "none");
  d3.select("#WorldLifeEMap").style("display", "none");
  d3.select("#Table").style("display", "");
}

/* This function receives HPI data input and returns the appropriate colour,
   depending on the respective country's HPI */
function colorDataStudentSkills(hpi)
{
  // get color for the data
  if (hpi < 30)
  {
    return 'veryLow';
  }
  else if (hpi < 38)
  {
    return 'low';
  }
  else if (hpi < 45)
  {
    return 'medium';
  }
  else if (hpi < 53)
  {
    return 'high';
  }
  else if (hpi >= 53)
  {
    return 'veryHigh';
  }
}

/* This function receives footprint (gha/capita) data input and returns the appropriate colour,
   depending on the respective country's footprint (gha/capita) */
function colorDataEmployment(foot)
{
  // get color for the data
  if (foot < 1)
  {
    return 'veryLow';
  }
  else if (foot < 1.8)
  {
    return 'low';
  }
  else if (foot < 3)
  {
    return 'medium';
  }
  else if (foot < 6)
  {
    return 'high';
  }
  else if (foot >= 6)
  {
    return 'veryHigh';
  }
}

/* This function receives well-being data input and returns the appropriate colour,
   depending on the respective country's well-being */
function colorDataSatisfaction(wellB)
{
  // get color for the data
  if (wellB < 4)
  {
    return 'veryLow';
  }
  else if (wellB < 5)
  {
    return 'low';
  }
  else if (wellB < 6)
  {
    return 'medium';
  }
  else if (wellB < 7)
  {
    return 'high';
  }
  else if (wellB >= 7)
  {
    return 'veryHigh';
  }
}

/* This function receives life expectancy data input and returns the appropriate colour,
   depending on the respective country's life expectancy */
function colorDataPersonalEarnings(lifeE)
{
  // get color for the data
  if (lifeE < 55)
  {
    return 'veryLow';
  }
  else if (lifeE < 66)
  {
    return 'low';
  }
  else if (lifeE < 75)
  {
    return 'medium';
  }
  else if (lifeE < 80)
  {
    return 'high';
  }
  else if (lifeE >= 80)
  {
    return 'veryHigh';
  }
}

// code conversion
var country_codes = [
    ["af", "AFG", "Afghanistan"],
    ["ax", "ALA", "Åland Islands"],
    ["al", "ALB", "Albania"],
    ["dz", "DZA", "Algeria"],
    ["as", "ASM", "American Samoa"],
    ["ad", "AND", "Andorra"],
    ["ao", "AGO", "Angola"],
    ["ai", "AIA", "Anguilla"],
    ["aq", "ATA", "Antarctica"],
    ["ag", "ATG", "Antigua and Barbuda"],
    ["ar", "ARG", "Argentina"],
    ["am", "ARM", "Armenia"],
    ["aw", "ABW", "Aruba"],
    ["au", "AUS", "Australia"],
    ["at", "AUT", "Austria"],
    ["az", "AZE", "Azerbaijan"],
    ["bs", "BHS", "Bahamas"],
    ["bh", "BHR", "Bahrain"],
    ["bd", "BGD", "Bangladesh"],
    ["bb", "BRB", "Barbados"],
    ["by", "BLR", "Belarus"],
    ["be", "BEL", "Belgium"],
    ["bz", "BLZ", "Belize"],
    ["bj", "BEN", "Benin"],
    ["bm", "BMU", "Bermuda"],
    ["bt", "BTN", "Bhutan"],
    ["bo", "BOL", "Bolivia"],
    ["bq", "BES", "Bonaire, Sint Eustatius and Saba"],
    ["ba", "BIH", "Bosnia and Herzegovina"],
    ["bw", "BWA", "Botswana"],
    ["bv", "BVT", "Bouvet Island"],
    ["br", "BRA", "Brazil"],
    ["io", "IOT", "British Indian Ocean Territory"],
    ["bn", "BRN", "Brunei Darussalam"],
    ["bg", "BGR", "Bulgaria"],
    ["bf", "BFA", "Burkina Faso"],
    ["bi", "BDI", "Burundi"],
    ["kh", "KHM", "Cambodia"],
    ["cm", "CMR", "Cameroon"],
    ["ca", "CAN", "Canada"],
    ["cv", "CPV", "Cape Verde"],
    ["ky", "CYM", "Cayman Islands"],
    ["cf", "CAF", "Central African Republic"],
    ["td", "TCD", "Chad"],
    ["cl", "CHL", "Chile"],
    ["cn", "CHN", "China"],
    ["cx", "CXR", "Christmas Island"],
    ["cc", "CCK", "Cocos (Keeling) Islands"],
    ["co", "COL", "Colombia"],
    ["km", "COM", "Comoros"],
    ["cg", "COG", "Congo"],
    ["cd", "COD", "Congo, the Democratic Republic of the"],
    ["ck", "COK", "Cook Islands"],
    ["cr", "CRI", "Costa Rica"],
    ["ci", "CIV", "Côte d'Ivoire"],
    ["hr", "HRV", "Croatia"],
    ["cu", "CUB", "Cuba"],
    ["cw", "CUW", "Curaçao"],
    ["cy", "CYP", "Cyprus"],
    ["cz", "CZE", "Czech Republic"],
    ["dk", "DNK", "Denmark"],
    ["dj", "DJI", "Djibouti"],
    ["dm", "DMA", "Dominica"],
    ["do", "DOM", "Dominican Republic"],
    ["ec", "ECU", "Ecuador"],
    ["eg", "EGY", "Egypt"],
    ["sv", "SLV", "El Salvador"],
    ["gq", "GNQ", "Equatorial Guinea"],
    ["er", "ERI", "Eritrea"],
    ["ee", "EST", "Estonia"],
    ["et", "ETH", "Ethiopia"],
    ["fk", "FLK", "Falkland Islands (Malvinas)"],
    ["fo", "FRO", "Faroe Islands"],
    ["fj", "FJI", "Fiji"],
    ["fi", "FIN", "Finland"],
    ["fr", "FRA", "France"],
    ["gf", "GUF", "French Guiana"],
    ["pf", "PYF", "French Polynesia"],
    ["tf", "ATF", "French Southern Territories"],
    ["ga", "GAB", "Gabon"],
    ["gm", "GMB", "Gambia"],
    ["ge", "GEO", "Georgia"],
    ["de", "DEU", "Germany"],
    ["gh", "GHA", "Ghana"],
    ["gi", "GIB", "Gibraltar"],
    ["gr", "GRC", "Greece"],
    ["gl", "GRL", "Greenland"],
    ["gd", "GRD", "Grenada"],
    ["gp", "GLP", "Guadeloupe"],
    ["gu", "GUM", "Guam"],
    ["gt", "GTM", "Guatemala"],
    ["gg", "GGY", "Guernsey"],
    ["gn", "GIN", "Guinea"],
    ["gw", "GNB", "Guinea-Bissau"],
    ["gy", "GUY", "Guyana"],
    ["ht", "HTI", "Haiti"],
    ["hm", "HMD", "Heard Island and McDonald Islands"],
    ["va", "VAT", "Holy See (Vatican City State)"],
    ["hn", "HND", "Honduras"],
    ["hk", "HKG", "Hong Kong"],
    ["hu", "HUN", "Hungary"],
    ["is", "ISL", "Iceland"],
    ["in", "IND", "India"],
    ["id", "IDN", "Indonesia"],
    ["ir", "IRN", "Iran"],
    ["iq", "IRQ", "Iraq"],
    ["ie", "IRL", "Ireland"],
    ["im", "IMN", "Isle of Man"],
    ["il", "ISR", "Israel"],
    ["it", "ITA", "Italy"],
    ["jm", "JAM", "Jamaica"],
    ["jp", "JPN", "Japan"],
    ["je", "JEY", "Jersey"],
    ["jo", "JOR", "Jordan"],
    ["kz", "KAZ", "Kazakhstan"],
    ["ke", "KEN", "Kenya"],
    ["ki", "KIR", "Kiribati"],
    ["kp", "PRK", "Korea, Democratic People's Republic of"],
    ["kr", "KOR", "Korea, Republic of"],
    ["kw", "KWT", "Kuwait"],
    ["kg", "KGZ", "Kyrgyzstan"],
    ["la", "LAO", "Lao People's Democratic Republic"],
    ["lv", "LVA", "Latvia"],
    ["lb", "LBN", "Lebanon"],
    ["ls", "LSO", "Lesotho"],
    ["lr", "LBR", "Liberia"],
    ["ly", "LBY", "Libya"],
    ["li", "LIE", "Liechtenstein"],
    ["lt", "LTU", "Lithuania"],
    ["lu", "LUX", "Luxembourg"],
    ["mo", "MAC", "Macao"],
    ["mk", "MKD", "Macedonia, the Former Yugoslav Republic of"],
    ["mg", "MDG", "Madagascar"],
    ["mw", "MWI", "Malawi"],
    ["my", "MYS", "Malaysia"],
    ["mv", "MDV", "Maldives"],
    ["ml", "MLI", "Mali"],
    ["mt", "MLT", "Malta"],
    ["mh", "MHL", "Marshall Islands"],
    ["mq", "MTQ", "Martinique"],
    ["mr", "MRT", "Mauritania"],
    ["mu", "MUS", "Mauritius"],
    ["yt", "MYT", "Mayotte"],
    ["mx", "MEX", "Mexico"],
    ["fm", "FSM", "Micronesia, Federated States of"],
    ["md", "MDA", "Moldova, Republic of"],
    ["mc", "MCO", "Monaco"],
    ["mn", "MNG", "Mongolia"],
    ["me", "MNE", "Montenegro"],
    ["ms", "MSR", "Montserrat"],
    ["ma", "MAR", "Morocco"],
    ["mz", "MOZ", "Mozambique"],
    ["mm", "MMR", "Myanmar"],
    ["na", "NAM", "Namibia"],
    ["nr", "NRU", "Nauru"],
    ["np", "NPL", "Nepal"],
    ["nl", "NLD", "Netherlands"],
    ["nc", "NCL", "New Caledonia"],
    ["nz", "NZL", "New Zealand"],
    ["ni", "NIC", "Nicaragua"],
    ["ne", "NER", "Niger"],
    ["ng", "NGA", "Nigeria"],
    ["nu", "NIU", "Niue"],
    ["nf", "NFK", "Norfolk Island"],
    ["mp", "MNP", "Northern Mariana Islands"],
    ["no", "NOR", "Norway"],
    ["om", "OMN", "Oman"],
    ["pk", "PAK", "Pakistan"],
    ["pw", "PLW", "Palau"],
    ["ps", "PSE", "Palestine, State of"],
    ["pa", "PAN", "Panama"],
    ["pg", "PNG", "Papua New Guinea"],
    ["py", "PRY", "Paraguay"],
    ["pe", "PER", "Peru"],
    ["ph", "PHL", "Philippines"],
    ["pn", "PCN", "Pitcairn"],
    ["pl", "POL", "Poland"],
    ["pt", "PRT", "Portugal"],
    ["pr", "PRI", "Puerto Rico"],
    ["qa", "QAT", "Qatar"],
    ["re", "REU", "Réunion"],
    ["ro", "ROU", "Romania"],
    ["ru", "RUS", "Russia"],
    ["rw", "RWA", "Rwanda"],
    ["bl", "BLM", "Saint Barthélemy"],
    ["sh", "SHN", "Saint Helena, Ascension and Tristan da Cunha"],
    ["kn", "KNA", "Saint Kitts and Nevis"],
    ["lc", "LCA", "Saint Lucia"],
    ["mf", "MAF", "Saint Martin (French part)"],
    ["pm", "SPM", "Saint Pierre and Miquelon"],
    ["vc", "VCT", "Saint Vincent and the Grenadines"],
    ["ws", "WSM", "Samoa"],
    ["sm", "SMR", "San Marino"],
    ["st", "STP", "Sao Tome and Principe"],
    ["sa", "SAU", "Saudi Arabia"],
    ["sn", "SEN", "Senegal"],
    ["rs", "SRB", "Serbia"],
    ["sc", "SYC", "Seychelles"],
    ["sl", "SLE", "Sierra Leone"],
    ["sg", "SGP", "Singapore"],
    ["sx", "SXM", "Sint Maarten (Dutch part)"],
    ["sk", "SVK", "Slovakia"],
    ["si", "SVN", "Slovenia"],
    ["sb", "SLB", "Solomon Islands"],
    ["so", "SOM", "Somalia"],
    ["za", "ZAF", "South Africa"],
    ["gs", "SGS", "South Georgia and the South Sandwich Islands"],
    ["ss", "SSD", "South Sudan"],
    ["es", "ESP", "Spain"],
    ["lk", "LKA", "Sri Lanka"],
    ["sd", "SDN", "Sudan"],
    ["sr", "SUR", "Suriname"],
    ["sj", "SJM", "Svalbard and Jan Mayen"],
    ["sz", "SWZ", "Swaziland"],
    ["se", "SWE", "Sweden"],
    ["ch", "CHE", "Switzerland"],
    ["sy", "SYR", "Syria"],
    ["tw", "TWN", "Taiwan, Province of China"],
    ["tj", "TJK", "Tajikistan"],
    ["tz", "TZA", "Tanzania"],
    ["th", "THA", "Thailand"],
    ["tl", "TLS", "Timor-Leste"],
    ["tg", "TGO", "Togo"],
    ["tk", "TKL", "Tokelau"],
    ["to", "TON", "Tonga"],
    ["tt", "TTO", "Trinidad and Tobago"],
    ["tn", "TUN", "Tunisia"],
    ["tr", "TUR", "Turkey"],
    ["tm", "TKM", "Turkmenistan"],
    ["tc", "TCA", "Turks and Caicos Islands"],
    ["tv", "TUV", "Tuvalu"],
    ["ug", "UGA", "Uganda"],
    ["ua", "UKR", "Ukraine"],
    ["ae", "ARE", "United Arab Emirates"],
    ["gb", "GBR", "United Kingdom"],
    ["us", "USA", "United States of America"],
    ["um", "UMI", "United States Minor Outlying Islands"],
    ["uy", "URY", "Uruguay"],
    ["uz", "UZB", "Uzbekistan"],
    ["vu", "VUT", "Vanuatu"],
    ["ve", "VEN", "Venezuela"],
    ["vn", "VNM", "Viet Nam"],
    ["vg", "VGB", "Virgin Islands, British"],
    ["vi", "VIR", "Virgin Islands, U.S."],
    ["wf", "WLF", "Wallis and Futuna"],
    ["eh", "ESH", "Western Sahara"],
    ["ye", "YEM", "Yemen"],
    ["zm", "ZMB", "Zambia"],
    ["zw", "ZWE", "Zimbabwe"] ];



/*
 * Draw the world map by HPI
 */
// load the data
d3.json('data_linkedViews.json',
function(error, data) {
  if (error)
  {
    throw error;
  }
  data = data.data;

  // create a new object of the loaded data
  javaObject = {};
  data.forEach(function(d) {
        // get id of the country
        for (var code = 0; code < country_codes.length; code++)
        {
            if (country_codes[code][2] == d.country)
            {
                d.code = country_codes[code][1];
            }
        }

        javaObject[d.code] = {
          fillKey: colorDataHPI(d.HPI),
          name: d.code,
          HPI: d.HPI,
          footprint: d.Footprint_gha_capita,
          country: d.country,
          GDP: d.GDP_capita,
          governanceRank: d.governanceRank,
          rank: d.HPIrank,
          subregion: d.subregion,
          wellbeing: d.WellBeing,
          lifeExpectancy: d.lifeExpectancy,
          HappyLifeYears: d.HappyLifeYears,
          Population: d.Population
        };
      });

  // the HPI map
  $("#WorldHPIMap").datamap({
     scope: 'world',
     geography_config: {
       borderColor: 'rgba(0,0,0,0.5)',
       highlightBorderColor: 'rgba(0,255,255,1)',
       popupTemplate: _.template([
         '<div class="hoverinfo">',
         '<strong><%= geography.properties.name %></strong>',
         '<% if (data.name) { %>, <strong> <%= data.name %></strong><br/><% } %>',
         '<% if (data.HPI) { %> HPI: <%= data.HPI %><br/> <% } %>',
         '</div>'
        ].join('') )
     },
     fills: {
       defaultFill: '#808080',
       veryLow: '#e41a1c',
       low: '#ff3f00',
       medium: '#ff7f00',
       high: '#4d6f4a',
       veryHigh: '#4dcf4a'
     },
     data: javaObject
   });




/*
* Draw the world map by footprint
*/
   // create a new object of the loaded data
   javaObject = {};
   data.forEach(function(d) {
         // get id of the country
         for (var code = 0; code < country_codes.length; code++)
         {
             if (country_codes[code][2] == d.country)
             {
                 d.code = country_codes[code][1];
             }
         }

         javaObject[d.code] = {
           fillKey: colorDataFoot(d.Footprint_gha_capita),
           name: d.code,
           HPI: d.HPI,
           footprint: d.Footprint_gha_capita,
           country: d.country,
           GDP: d.GDP_capita,
           governanceRank: d.governanceRank,
           rank: d.HPIrank,
           subregion: d.subregion,
           wellbeing: d.WellBeing,
           lifeExpectancy: d.lifeExpectancy,
           HappyLifeYears: d.HappyLifeYears,
           Population: d.Population
         };
       });

   // the Footprint map
   $("#WorldFootMap").datamap({
      scope: 'world',
      geography_config: {
        borderColor: 'rgba(0,0,0,0.5)',
        highlightBorderColor: 'rgba(0,255,255,1)',
        popupTemplate: _.template([
          '<div class="hoverinfo">',
          '<strong><%= geography.properties.name %></strong>',
          '<% if (data.name) { %>, <strong> <%= data.name %></strong><br/><% } %>',
          '<% if (data.footprint) { %> Footprint: <%= data.footprint %><br/> <% } %>',
          '</div>'
         ].join('') )
      },
      fills: {
        defaultFill: '#808080',
        veryLow: '#4dcf4a',
        low: '#4d6f4a',
        medium: '#ff7f00',
        high: '#ff3f00',
        veryHigh: '#e41a1c'
      },
      data: javaObject
    });




/*
 * Draw the world map by well-being
 */
    // create a new object of the loaded data
    javaObject = {};
    data.forEach(function(d) {
          // get id of the country
          for (var code = 0; code < country_codes.length; code++)
          {
              if (country_codes[code][2] == d.country)
              {
                  d.code = country_codes[code][1];
              }
          }

          javaObject[d.code] = {
            fillKey: colorDataWellB(d.WellBeing),
            name: d.code,
            HPI: d.HPI,
            footprint: d.Footprint_gha_capita,
            country: d.country,
            GDP: d.GDP_capita,
            governanceRank: d.governanceRank,
            rank: d.HPIrank,
            subregion: d.subregion,
            wellbeing: d.WellBeing,
            lifeExpectancy: d.lifeExpectancy,
            HappyLifeYears: d.HappyLifeYears,
            Population: d.Population
          };
        });

    // the Well-Being map
    $("#WorldWellBMap").datamap({
       scope: 'world',
       geography_config: {
         borderColor: 'rgba(0,0,0,0.5)',
         highlightBorderColor: 'rgba(0,255,255,1)',
         popupTemplate: _.template([
           '<div class="hoverinfo">',
           '<strong><%= geography.properties.name %></strong>',
           '<% if (data.name) { %>, <strong> <%= data.name %></strong><br/><% } %>',
           '<% if (data.wellbeing) { %> Well-being: <%= data.wellbeing %><br/> <% } %>',
           '</div>'
          ].join('') )
       },
       fills: {
         defaultFill: '#808080',
         veryLow: '#e41a1c',
         low: '#ff3f00',
         medium: '#ff7f00',
         high: '#4d6f4a',
         veryHigh: '#4dcf4a'
       },
       data: javaObject
     });




 /*
  * Draw the world map by life expectancy
  */
     // create a new object of the loaded data
     javaObject = {};
     data.forEach(function(d) {
           // get id of the country
           for (var code = 0; code < country_codes.length; code++)
           {
               if (country_codes[code][2] == d.country)
               {
                   d.code = country_codes[code][1];
               }
           }

           javaObject[d.code] = {
             fillKey: colorDataLifeE(d.lifeExpectancy),
             name: d.code,
             HPI: d.HPI,
             footprint: d.Footprint_gha_capita,
             country: d.country,
             GDP: d.GDP_capita,
             governanceRank: d.governanceRank,
             rank: d.HPIrank,
             subregion: d.subregion,
             wellbeing: d.WellBeing,
             lifeExpectancy: d.lifeExpectancy,
             HappyLifeYears: d.HappyLifeYears,
             Population: d.Population
           };
         });

     // the Life Expectancy map
     $("#WorldLifeEMap").datamap({
        scope: 'world',
        geography_config: {
          borderColor: 'rgba(0,0,0,0.5)',
          highlightBorderColor: 'rgba(0,255,255,1)',
          popupTemplate: _.template([
            '<div class="hoverinfo">',
            '<strong><%= geography.properties.name %></strong>',
            '<% if (data.name) { %>, <strong> <%= data.name %></strong><br/><% } %>',
            '<% if (data.lifeExpectancy) { %> Life Expectancy: <%= data.lifeExpectancy %><br/> <% } %>',
            '</div>'
           ].join('') )
        },
        fills: {
          defaultFill: '#808080',
          veryLow: '#e41a1c',
          low: '#ff3f00',
          medium: '#ff7f00',
          high: '#4d6f4a',
          veryHigh: '#4dcf4a'
        },
        data: javaObject
      });





   /*
    * Graph life expectancy on the x-axis against well-being on the y-axis
    */
   var margin = {top: 50, right: 250, bottom: 50, left: 50},
       width = 1160 - margin.left - margin.right,
       height = 700 - margin.top - margin.bottom;

   var x = d3.scale.linear()
       .range([0, width]);

   var y = d3.scale.linear()
       .range([height, 0]);

   var xAxis = d3.svg.axis()
       .scale(x)
       .orient("bottom");

   var yAxis = d3.svg.axis()
       .scale(y)
       .orient("left");

  // sort the x-axis ascendingly
  data.sort(function(x, y){
      return d3.ascending(x.lifeExpectancy, y.lifeExpectancy);
   });

   var line = d3.svg.line()
       .x(function(d) { return x(+d.lifeExpectancy); })
       .y(function(d) { return y(+d.WellBeing); });

   var svg = d3.select("#graph_WellB_LifeE").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   // define label for crosshairs
   var label = svg.append("text")
       .attr("x", width - 5)
       .attr("y", height - 5)
       .style("text-anchor", "end");
   var label_point = svg.append("text");

   // define domains
   xDomain = d3.extent(data, function(d) { return +d.lifeExpectancy; });
   yDomain = d3.extent(data, function(d) { return +d.WellBeing; });
   x.domain(xDomain);
   y.domain(yDomain);

   // create x-axis
   svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis)
     .append("text")
       .attr("transform", "rotate(0)")
       .attr("y", 0)
       .attr("x", 1060)
       .attr("dy", "0em")
       .attr("dx", "-.50em")
       .style("text-anchor", "end")
       .style("font", "16px arial")
       .text("Life Expectancy (in years)");

   // create y-axis
   svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
     .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 6)
       .attr("dy", ".85em")
       .attr("dx", "-.65em")
       .style("text-anchor", "end")
       .style("font", "16px arial")
       .text("Well Being (0 - 10)");

   // draw the line
   svg.append("path")
       .datum(data)
       .attr("id", "line_WellB_LifeE")
       .attr("class", "line")
       .attr("d", line);

   // set points on the line
   var points = svg.selectAll(".point")
           .data(data).enter();

   points.append("svg:circle")
      .attr("stroke", "red")
      .attr("fill", function(d, i) { return "white" })
      .attr("cx", function(d, i) { return x(+d.lifeExpectancy) })
      .attr("cy", function(d, i) { return y(+d.WellBeing) })
      .attr("r", function(d, i) { return 4 })
      .attr("class", "circle");

  // focus tracking
   var focus = svg.append('g').style('display', 'none');

   focus.append('line')
       .attr('id', 'focusLineX')
       .attr('class', 'focusLine');
   focus.append('line')
       .attr('id', 'focusLineY')
       .attr('class', 'focusLine');
   focus.append('circle')
       .attr('id', 'focusCircle')
       .attr('r', 4)
       .attr('class', 'circle focusCircle');

   var bisectDate = d3.bisector(function(d) { return +d.lifeExpectancy; }).left;

   svg.append('rect')
       .attr('class', 'overlay')
       .attr('width', width)
       .attr('height', height)
       .on('mouseover', function() { focus.style('display', null); })
       .on('mouseout', function() { focus.style('display', 'none'); })
       .on('mousemove', function() {
           var mouse = d3.mouse(this);
           var mouseX = x.invert(mouse[0]);

           // file 1
           var i = bisectDate(data, mouseX); // returns the index to the current data item

           var d0 = data[i - 1]
           var d1 = data[i];
           // work out which date value is closest to the mouse
           var d_index = (+d1.lifeExpectancy - +d0.lifeExpectancy) / 2.0 > mouseX - +d0.lifeExpectancy ? d0 : d1;
           // mouseX - d0[0] > d1[0] - mouseX ? d1 : d0;

           var xVal = x(+d_index.lifeExpectancy);
           var yVal = y(+d_index.WellBeing);

           focus.select('#focusCircle')
               .attr('cx', xVal)
               .attr('cy', yVal);
           focus.select('#focusLineX')
               .attr('x1', xVal).attr('y1', y(yDomain[0]))
               .attr('x2', xVal).attr('y2', y(yDomain[1]));
           focus.select('#focusLineY')
               .attr('x1', x(xDomain[0])).attr('y1', yVal)
               .attr('x2', x(xDomain[1])).attr('y2', yVal);

           // define label for crosshairs file1
           label_point.attr("x", xVal + 10).attr("y", yVal + 13).style("text-anchor", "center");
           label_point.text(function() {
             return "x=" + x.invert(xVal) + ", y=" + y.invert(yVal);
           });

           // put a text label in the lower-right corner
           label.text(function() {
             return "x=" + x.invert(mouse[0]) + ", y=" + y.invert(mouse[1]);
           });
       });




   /*
    * Graph GDP/capita on the x-axis against Ecological Footprint on the y-axis
    */
  /*
  // sort the x-axis ascendingly
  data.sort(function(x, y) {
      return d3.ascending(x.GDP_capita, y.GDP_capita);
   });

   var line = d3.svg.line()
       .x(function(d) { return x(+d.GDP_capita); })
       .y(function(d) { return y(+d.Footprint_gha_capita); });

   var svg = d3.select("#graph_GDP_FootP").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   // define label for crosshairs
   var label = svg.append("text")
       .attr("x", width - 5)
       .attr("y", height - 5)
       .style("text-anchor", "end");
   var label_point = svg.append("text");

   // define domains
   xDomain = d3.extent(data, function(d) { return +d.GDP_capita; });
   yDomain = d3.extent(data, function(d) { return +d.Footprint_gha_capita; });
   x.domain(xDomain);
   y.domain(yDomain);

   // create x-axis
   svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis)
     .append("text")
       .attr("transform", "rotate(0)")
       .attr("y", 0)
       .attr("x", 1060)
       .attr("dy", "0em")
       .attr("dx", "-.50em")
       .style("text-anchor", "end")
       .style("font", "16px arial")
       .text("GDP/capita ($PPP)");

   // create y-axis
   svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
     .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 6)
       .attr("dy", ".85em")
       .attr("dx", "-.65em")
       .style("text-anchor", "end")
       .style("font", "16px arial")
       .text("Ecological Footprint (gha/capita)");

   // draw the line
   svg.append("path")
       .datum(data)
       .attr("id", "line_WellB_LifeE")
       .attr("class", "line")
       .attr("d", line);

   // set points on the line
   var points = svg.selectAll(".point")
           .data(data).enter();

   points.append("svg:circle")
      .attr("stroke", "red")
      .attr("fill", function(d, i) { return "white" })
      .attr("cx", function(d, i) { return x(+d.GDP_capita) })
      .attr("cy", function(d, i) { return y(+d.Footprint_gha_capita) })
      .attr("r", function(d, i) { return 4 })
      .attr("class", "circle");

  // focus tracking
   var focus2 = svg.append('g').style('display', 'none');

   focus2.append('line')
       .attr('id', 'focusLineX2')
       .attr('class', 'focusLine');
   focus2.append('line')
       .attr('id', 'focusLineY2')
       .attr('class', 'focusLine');
   focus2.append('circle')
       .attr('id', 'focusCircle2')
       .attr('r', 4)
       .attr('class', 'circle focusCircle');

   var bisectDate = d3.bisector(function(d) { return +d.GDP_capita; }).left;

   svg.append('rect')
       .attr('class', 'overlay')
       .attr('width', width)
       .attr('height', height)
       .on('mouseover', function() { focus2.style('display', null); })
       .on('mouseout', function() { focus2.style('display', 'none'); })
       .on('mousemove', function() {
           var mouse = d3.mouse(this);
           var mouseX = x.invert(mouse_two[0]);

           // file 1
           var i = bisectDate(data, mouseX); // returns the index to the current data item

           var d0 = data[i - 1]
           var d1 = data[i];
           // work out which date value is closest to the mouse
           var d_index = (+d1.GDP_capita - +d0.GDP_capita) / 2.0 > mouseX - +d0.GDP_capita ? d0 : d1;
           // mouseX - d0[0] > d1[0] - mouseX ? d1 : d0;

           var xVal = x(+d_index.GDP_capita);
           var yVal = y(+d_index.Footprint_gha_capita);

           focus2.select('#focusCircle2')
               .attr('cx', xVal)
               .attr('cy', yVal);
           focus2.select('#focusLineX2')
               .attr('x1', xVal).attr('y1', y(yDomain_two[0]))
               .attr('x2', xVal).attr('y2', y(yDomain_two[1]));
           focus2.select('#focusLineY2')
               .attr('x1', x(xDomain[0])).attr('y1', yVal)
               .attr('x2', x(xDomain[1])).attr('y2', yVal);

           // define label for crosshairs file1
           label_point.attr("x", xVal + 10).attr("y", yVal + 13).style("text-anchor", "center");
           label_point.text(function() {
             return "x=" + x.invert(xVal) + ", y=" + y.invert(yVal);
           });

           // put a text label in the lower-right corner
           label.text(function() {
             return "x=" + x.invert(mouse[0]) + ", y=" + y.invert(mouse[1]);
           });
       });
       */



       d3.csv('HPIcountries.csv', function(error, data) {
         /*
          * Build a table
          */
          function tabulate(data, columns) {
              var table = d3.select("#Table").append("table")
                      .attr("style", "margin-left: 0px"),
                  thead = table.append("thead"),
                  tbody = table.append("tbody");

              // append the header row
              thead.append("tr")
                  .selectAll("th")
                  .data(columns)
                  .enter()
                  .append("th")
                      .text(function(column) { return column; });

              // create a row for each object in the data
              var rows = tbody.selectAll("tr")
                  .data(data)
                  .enter()
                  .append("tr");

              // create a cell in each row for each column
              var cells = rows.selectAll("td")
                  .data(function(row) {
                      return columns.map(function(column) {
                          return {column: column, value: row[column]};
                      });
                  })
                  .enter()
                  .append("td")
                  .attr("style", "font-family: Courier") // sets the font style
                      .html(function(d) { return d.value; });

              return table;
            }

            // render the table
            var peopleTable = tabulate(data, ["HPI Rank", "Country", "Sub-Region",
            "Life Expectancy", "Well-being (0-10)", "Happy Life Years",
            "Footprint (gha/capita)", "Happy Planet Index",	"Population",
            "GDP/capita ($PPP)", "Governance Rank (1 = highest gov.)"]);
       });



       // add interactivity with the maps
       $("#WorldHPIMap").on('map-click', function(event, data) {
           alert( "Clicked on: " + data.geography.id + "\n" + "\n" +
           "Country name: " + data.data.country + "\n" +
           "Happy Planet Index: " + data.data.HPI + "\n" +
           "HPI rank: " + data.data.rank + "\n" +
           "Footprint: " + data.data.footprint + "\n" +
           "Life Expectancy: " + data.data.lifeExpectancy + "\n" +
           "Well-being: " + data.data.wellbeing + "\n" +
           "GDP/capita: " + data.data.GDP + "\n" +
           "Population: " + data.data.Population + "\n" +
           "Happy Life Years: " + data.data.HappyLifeYears + "\n" +
           "Governance Rank: " + data.data.governanceRank + "\n" +
           "Sub-region: " + data.data.subregion + "\n" +
           "Fill-key: " + data.data.fillKey + "\n"
          ); // alerts about which country you clicked on
       });
       $("#WorldFootMap").on('map-click', function(event, data) {
           alert( "Clicked on: " + data.geography.id + "\n" + "\n" +
           "Country name: " + data.data.country + "\n" +
           "Happy Planet Index: " + data.data.HPI + "\n" +
           "HPI rank: " + data.data.rank + "\n" +
           "Footprint: " + data.data.footprint + "\n" +
           "Life Expectancy: " + data.data.lifeExpectancy + "\n" +
           "Well-being: " + data.data.wellbeing + "\n" +
           "GDP/capita: " + data.data.GDP + "\n" +
           "Population: " + data.data.Population + "\n" +
           "Happy Life Years: " + data.data.HappyLifeYears + "\n" +
           "Governance Rank: " + data.data.governanceRank + "\n" +
           "Sub-region: " + data.data.subregion + "\n" +
           "Fill-key: " + data.data.fillKey + "\n"
          ); // alerts about which country you clicked on
       });
       $("#WorldWellBMap").on('map-click', function(event, data) {
           alert( "Clicked on: " + data.geography.id + "\n" + "\n" +
           "Country name: " + data.data.country + "\n" +
           "Happy Planet Index: " + data.data.HPI + "\n" +
           "HPI rank: " + data.data.rank + "\n" +
           "Footprint: " + data.data.footprint + "\n" +
           "Life Expectancy: " + data.data.lifeExpectancy + "\n" +
           "Well-being: " + data.data.wellbeing + "\n" +
           "GDP/capita: " + data.data.GDP + "\n" +
           "Population: " + data.data.Population + "\n" +
           "Happy Life Years: " + data.data.HappyLifeYears + "\n" +
           "Governance Rank: " + data.data.governanceRank + "\n" +
           "Sub-region: " + data.data.subregion + "\n" +
           "Fill-key: " + data.data.fillKey + "\n"
          ); // alerts about which country you clicked on
       });
       $("#WorldLifeEMap").on('map-click', function(event, data) {
           alert( "Clicked on: " + data.geography.id + "\n" + "\n" +
           "Country name: " + data.data.country + "\n" +
           "Happy Planet Index: " + data.data.HPI + "\n" +
           "HPI rank: " + data.data.rank + "\n" +
           "Footprint: " + data.data.footprint + "\n" +
           "Life Expectancy: " + data.data.lifeExpectancy + "\n" +
           "Well-being: " + data.data.wellbeing + "\n" +
           "GDP/capita: " + data.data.GDP + "\n" +
           "Population: " + data.data.Population + "\n" +
           "Happy Life Years: " + data.data.HappyLifeYears + "\n" +
           "Governance Rank: " + data.data.governanceRank + "\n" +
           "Sub-region: " + data.data.subregion + "\n" +
           "Fill-key: " + data.data.fillKey + "\n"
          ); // alerts about which country you clicked on
       });



       /*
        * Set maps and graphs on display:none
        */
       d3.select("#graph_WellB_LifeE").style('display', "none");
       d3.select("#graph_GDP_FootP").style('display', "none");
       d3.select("#WorldHPIMap").style('display', "none");
       d3.select("#WorldFootMap").style("display", "none");
       d3.select("#WorldWellBMap").style("display", "none");
       d3.select("#WorldLifeEMap").style("display", "none");
       d3.select("#Table").style("display", "none");
 });
