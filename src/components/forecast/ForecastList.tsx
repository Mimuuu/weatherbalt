import * as React from 'react';
import Forecast from './Forecast';
import { getReadableDate } from '../../utils/dates';

import './ForecastList.css';

interface ForecastListProps {
	list: ForecastDay[];
	cityName: string;
}

class ForecastList extends React.PureComponent<ForecastListProps> {

	render() {
		const { cityName, list } = this.props;

		return (
			<div className='forecast-list'>
				<h1>{cityName}</h1>
				{list.map(this.renderForecastDay)}
			</div>
		);
	}

	private renderForecastDay = (forecastDay: ForecastDay) => {
		return (
			<div className='forecast-day' key={forecastDay.date}>
				<h3>{getReadableDate(forecastDay.date)}</h3>
				{forecastDay.forecast.map(this.renderForecast)}
			</div>
		);
	}

	private renderForecast(forecast: Forecast) {
		return <Forecast forecast={forecast} key={forecast.time} />;
	}
}

export default ForecastList;
