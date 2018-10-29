const DAYS = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

// Just parsing the string here instead of using dates object
// as it's a limited example. Ideally we would be showing
// the local time too

export function getTimeFromDate(date: string): string {
	return date.split(' ')[1];
}

export function getDateFromDate(date: string): string {
	return date.split(' ')[0];
}

export function getReadableDate(date: string): string {
	const d = new Date(date);
	return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}