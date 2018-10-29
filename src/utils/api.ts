import axios from 'axios';

const API_KEY = '5841b3f4c7726a7ff76001e05df721fa';
const API_HOST = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export function getForecastByCity(city: string) {
	const request = `${API_HOST}&q=${city}`;
	return axios.get(request);
}

export function getForecastById(id: number) {
	const request = `${API_HOST}&id=${id}`;
	return axios.get(request);
}

export function getForecastByCoords({ lat, lon }: Coords) {
	console.log('#### GET BY COORDS', lat, lon);
	const request = `${API_HOST}&lat=${lat}&lon=${lon}`;
	return axios.get(request);
}