import * as React from 'react';
import CityInput from './forms/CityInput';
import ForecastList from './forecast/ForecastList';
import Spinner from './loading/Spinner';
import { getForecastByCity, getForecastById, getForecastByCoords } from '../utils/api';
import { buildForecastList } from '../utils/utils';

import './Weatherbalt.css';

const DEFAULT_CITY = { name: 'London, GB' };

interface WeatherbaltState {
	cityName: string;
	forecastList?: ForecastDay[];
	error: boolean;
}

class Weatherbalt extends React.Component<{}, WeatherbaltState> {
	state = {
		cityName: '',
		forecastList: undefined,
		error: false
	};

	componentDidMount() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(pos => {
				const coords: Coords = {
					lat: pos.coords.latitude,
					lon: pos.coords.longitude
				};

				getForecastByCoords(coords).then(this.updateWeather).catch(this.setError);
			}, () => {
				this.loadForecast(DEFAULT_CITY);
			})
		} else {
			this.loadForecast(DEFAULT_CITY);
		}
	}

  render() {
    return (
      <div className="weatherbalt">
				<h1>Weatherbalt</h1>
				<CityInput
					placeholder='Specify a city'
					loadNewCity={this.loadNewCity}
					autocomplete={true}
				/>
				{this.renderForecastList()}
      </div>
    );
	}

	private loadNewCity = (city: City) => {
		this.loadForecast(city);
	}

	private loadForecast(city: City) {
		city.id
			? getForecastById(city.id).then(this.updateWeather).catch(this.setError)
			: getForecastByCity(city.name).then(this.updateWeather).catch(this.setError);
	}

	private updateWeather = res => {
		const forecastList = buildForecastList(res.data.list);
		
		this.setState({
			cityName: `${res.data.city.name}, ${res.data.city.country}`,
			forecastList,
			error: false
		});
	}

	private setError = () => {
		this.setState({ error: true });
	}
	
	private renderForecastList() {
		const { forecastList, cityName, error } = this.state;

		if (error) return this.renderError();

		return forecastList
			? <ForecastList list={forecastList} cityName={cityName} />
			: <Spinner className='weatherbalt__spinner' />;
	}

	private renderError() {
		return <div className='weatherbalt__error'>Something wrong happened. Please try again later or another city.</div>;
	}
}

export default Weatherbalt;
