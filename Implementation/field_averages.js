/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

// load the data
d3.json('fields_grad_info.json',
function(error, data) {
  if (error) throw error("Error: the file did not load!");
  data = data.points;

  // extract the relevant variables to newly defined objects
  fieldTotals = {};
  fieldAverages = {};
  allFields = [];

  // store an object containing total percentage and length for every field
  data.forEach(function(d) {
    if (d.Value != "" && d.Value != 0)
    {
        if (fieldTotals[d.field])
        {
          fieldTotals[d.field].Percentage += parseFloat(d.Value);
          fieldTotals[d.field].Length += 1;
        }
        else
        {
          fieldTotals[d.field] =
          {
            Percentage: parseFloat(d.Value),
            Length: 0
          }

          // add new field to allFields array and define fieldAverages entry
          fieldAverages[d.field] = 0;
          allFields.push(d.field);
        }
    }
  });

  // calculate averages for all fields
  for (var i = 0; i < allFields.length; i++)
  {
    fieldAverages[allFields[i]] = fieldTotals[allFields[i]].Percentage / fieldTotals[allFields[i]].Length;
  }
});
