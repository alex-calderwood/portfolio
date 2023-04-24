import csv
lookup = dict()

with open('arpa_to_ipa.tsv', 'r') as f:
	r = csv.reader(f, delimiter='\t')
	for row in r:
		lookup[row[1]] = row[2]


def get_ipa(arpa):
	# Remove numbers (they indicate stress)
	arpa = ''.join(filter(lambda x: x.isalpha(), arpa))
	return lookup.get(arpa)  # Return None if not found


# Example
# print(get_ipa('OY1'))
