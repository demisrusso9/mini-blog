export const sortByDate = (date1: string, date2: string) => {
	return new Date(date1).getTime() - new Date(date2).getTime()
}
