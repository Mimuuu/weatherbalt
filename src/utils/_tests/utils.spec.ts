import { buildForecastList, kelvinToCelsius } from '../utils';

const TEMPERATURE = 0;
const HUMIDITY = 99;

describe('Kelvin to Celsius', () => {

	const kelvin = [273.15, 0, 2.343523232, 0.0000000032434312, -1232.232];
	const celsius = [0, -273.15, -270.81, -273.15, -1505.38];

	it('Convert correctly and round to 2 digits', () => {
		for (let i=0; i<kelvin.length; i++) {
			expect(kelvinToCelsius(kelvin[i])).toBe(celsius[i]);
		}
	});
});

describe('Should order the list grouped by days', () => {
	const raw = [
		getRawItem("2018-10-29 03:00:00"),
		getRawItem("2018-10-29 06:00:00"),
		getRawItem("2018-10-29 09:00:00"),
		getRawItem("2018-10-30 03:00:00"),
		getRawItem("2018-10-30 18:00:00"),
		getRawItem("2018-10-30 21:00:00"),
		getRawItem("2018-10-30 23:00:00"),
		getRawItem("2018-10-31 03:00:00"),
		getRawItem("2018-10-31 06:00:00")
	];

	const ordered = [
		{ date: '2018-10-29', forecast: [
			getOrderedItem('03:00:00'),
			getOrderedItem('06:00:00'),
			getOrderedItem('09:00:00')
		]},
		{ date: '2018-10-30', forecast: [
			getOrderedItem('03:00:00'),
			getOrderedItem('18:00:00'),
			getOrderedItem('21:00:00'),
			getOrderedItem('23:00:00')
		]},
		{ date: '2018-10-31', forecast: [
			getOrderedItem('03:00:00'),
			getOrderedItem('06:00:00')
		]},
	];

	expect(JSON.stringify(buildForecastList(raw))).toBe(JSON.stringify(ordered));
});

function getRawItem(date: string) {
	return {
		dt_txt: date,
		main: {temp_min: TEMPERATURE, temp_max: TEMPERATURE, humidity: HUMIDITY},
		weather: [
			{
				description: "light rain",
				icon: "10n"
			}
		]
	}
}

function getOrderedItem(time: string) {
	return {
		time,
		maxTemp: kelvinToCelsius(TEMPERATURE),
		minTemp: kelvinToCelsius(TEMPERATURE),
		humidity: HUMIDITY,
		icon: 'https://openweathermap.org/img/w/10n.png',
		desc: 'light rain'
	};
}
