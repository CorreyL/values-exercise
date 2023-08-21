import csv
import json

csv_file_path = './intermediate-files-for-posterity/Valuescards.csv'

values_and_descriptor = {}

with open(csv_file_path, 'r', newline='') as csvfile:
  csv_reader = csv.reader(csvfile)
  last_encountered_value = None
  for row in csv_reader:
    string = row[0]
    if string.isupper():
      # Encountered a value
      # This is a value, so it should go directly into the dictionary
      values_and_descriptor[string] = ''
      last_encountered_value = string
    elif string.islower():
      # Encountered a descriptor
      if values_and_descriptor[last_encountered_value] != '':
        # Some descriptors span multiple lines, so we need to prepend a space
        # so that the beginning of this string is not concatenated to the
        # previous word
        string = f' {string}'
      values_and_descriptor[last_encountered_value] += string

# Sort the keys because I like to see my data in sorted order =3
dict_keys = list(values_and_descriptor.keys())
dict_keys.sort()
sorted_dict_keys = {
  key: values_and_descriptor[key] for key in dict_keys
}

with open('./intermediate-files-for-posterity/values-and-descriptors.json', 'w+') as outfile:
  outfile.write(json.dumps(sorted_dict_keys, indent=4))
