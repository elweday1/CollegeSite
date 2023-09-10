// @ts-nocheck
export function randomDate(date1, date2) {
	function randomValueBetween(val1, val2) {
		const max = Math.max(val1, val2);
		const min = Math.min(val1, val2);
		return Math.random() * (max - min) + min;
	}
	date1 = new Date(date1).getTime();
	date2 = new Date(date2).getTime();
	return new Date(randomValueBetween(date1, date2));
}
