/**
 * Transforms a comma-separated string of tags into an array of trimmed tag strings.
 *
 * @param tags - A string containing tags separated by commas.
 * @returns An array of individual tag strings with whitespace removed from both ends.
 */
export function transformTags(tags: string) {
	return tags.split(',').map((item) => item.trim())
}
