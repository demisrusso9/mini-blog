export function transformTags(tags: string) {
	return tags.split(',').map((item) => item.trim())
}
