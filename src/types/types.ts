interface ForecastDay {
	date: string;
	forecast: Forecast[];
}

interface Forecast {
	time: string;
	maxTemp: number;
	minTemp: number;
	humidity: number;
	icon: string;
	desc: string;
}

interface City {
	name: string;
	id?: number;
}
