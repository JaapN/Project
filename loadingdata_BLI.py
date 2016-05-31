import json

# output
output = []

# load data into arrays
import csv
with open('BLI_custom.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
    	output.append({"location": row[0], "country": row[1], "indicator": row[3],
         "unit code": row[8], "unit": row[9], "Value": row[14]})

# write result into new file
output_end = {"points": output}
outputfile = open('BLI_info.json', 'w');
json.dump(output_end, outputfile);
