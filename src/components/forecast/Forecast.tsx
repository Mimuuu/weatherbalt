import * as React from 'react';

import './Forecast.css';

interface ForecastProps {
	forecast: Forecast;
}

const Forecast = ({ forecast }: ForecastProps) => {
	return (
		<div className='forecast'>
			<img className='forecast__icon' src={forecast.icon} alt={forecast.desc} />
			<p className='forecast__time'>{forecast.time}</p>
			<p className='forecast__desc'>{forecast.desc}</p>

			<p className='forecast__metadata forecast__min'>
				<span className='forecast__metadata-title'>Min: </span>
				<span>{forecast.minTemp}&deg;C</span>
			</p>
			<p className='forecast__metadata forecast__max'>
				<span className='forecast__metadata-title'>Max: </span>
				<span>{forecast.maxTemp}&deg;C</span>
			</p>
			<p className='forecast__metadata forecast__humidity'>
				<span className='forecast__metadata-title'>Humidity: </span>
				<span>{forecast.humidity || '-'}%</span>
			</p>
		</div>
	);
}

export default Forecast;
