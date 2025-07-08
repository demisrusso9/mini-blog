/**
 * Compares two date strings and returns a numeric value indicating their relative order.
 *
 * @param date1 - The first date string to compare.
 * @param date2 - The second date string to compare.
 * @returns A negative number if `date1` is earlier than `date2`,
 *          zero if they are equal, or a positive number if `date1` is later than `date2`.
 */
export const sortByDate = (date1: string, date2: string) => {
	return new Date(date1).getTime() - new Date(date2).getTime()
}
