import { getTimeFromDate, getDateFromDate} from './dates';

// Group forecast by day
// Keep only the information we'll use
export function buildForecastList(list: any[]): ForecastDay[] {
	const forecastList: ForecastDay[] = [];

	list.map(item => {
		const date = getDateFromDate(item.dt_txt);
		const forecastItem = buildForecastItem(item);
		const length = forecastList.length;

		if (length === 0 || forecastList[length - 1].date !== date) {
				forecastList.push({
					date,
					forecast: [forecastItem]
				});
		} else {
			forecastList[length - 1].forecast.push(forecastItem);
		}
	});

	return forecastList;
}

function buildForecastItem(item: any): Forecast {
	return {
		time: getTimeFromDate(item.dt_txt),
		maxTemp: kelvinToCelsius(item.main.temp_max),
		minTemp: kelvinToCelsius(item.main.temp_min),
		humidity: item.main.humidity,
		icon: getIconPath(item.weather[0].icon),
		desc: item.weather[0].description
	};
}

function getIconPath(icon: string): string {
	return `https://openweathermap.org/img/w/${icon}.png`;
}

export function kelvinToCelsius(kelvin: number): number {
	return round2Digits(kelvin - 273.15);
}

function round2Digits(n: number): number {
	return Math.round(n * 100) / 100;
}
