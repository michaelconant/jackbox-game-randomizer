//remove "The", "An", and "A" from the begining of the name for better sorting
export function formatSorting(input) {
	return input.replace(/^(The|An|A)\s+/g, "");
}

// replace " " with "_" or the reverse to use the names are 
export function formatURL(input, reverse = false) {
	if (reverse) {
		return input.replace(/_/g, " ").toUpperCase();
	} else {
		let result = input.replace(/ /g, "_").toUpperCase();
		return result.replace(/'/g, "").toUpperCase();
	}
}