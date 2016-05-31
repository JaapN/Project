import json

# output
output = []

# load data into arrays
import csv
with open('fields_grad_data.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
    	output.append({"location": row[0], "country": row[1], "FIELD": row[4],
         "field": row[5], "unit code": row[12], "unit": row[13], "Value": row[18]})

# write result into new file
output_end = {"points": output}
outputfile = open('fields_grad_info.json', 'w');
json.dump(output_end, outputfile);
