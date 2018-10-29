import axios from 'axios';

const API_KEY = '5841b3f4c7726a7ff76001e05df721fa';

export function getForecastByCity(city: string) {
	const request = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
	return axios.get(request);
}

export function getForecastById(id: number) {
	const request = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${API_KEY}`;
	return axios.get(request);
}