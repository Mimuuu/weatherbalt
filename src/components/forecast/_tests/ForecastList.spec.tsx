import * as React from 'react';
import { create } from 'react-test-renderer';
import ForecastList from '../ForecastList';

describe('ForecastList', () => {

	const props = {
		list: [],
		cityName: 'City'
	};

	const updatedProps = {
		cityName: '',
		list: [
			{ date: '1', forecast: [
				{ time: '1', maxTemp: 0, minTemp: 0, humidity: 0, icon: '', desc: ''}
			]},
			{ date: '2', forecast: [
				{ time: '1', maxTemp: 0, minTemp: 0, humidity: 0, icon: '', desc: ''},
				{ time: '2', maxTemp: 0, minTemp: 0, humidity: 0, icon: '', desc: ''},
				{ time: '3', maxTemp: 0, minTemp: 0, humidity: 0, icon: '', desc: ''},
				{ time: '4', maxTemp: 0, minTemp: 0, humidity: 0, icon: '', desc: ''},
				{ time: '5', maxTemp: 0, minTemp: 0, humidity: 0, icon: '', desc: ''}
			]},
			{ date: '3', forecast: []},
			{ date: '4', forecast: [
				{ time: '1', maxTemp: 0, minTemp: 0, humidity: 0, icon: '', desc: ''},
				{ time: '2', maxTemp: 0, minTemp: 0, humidity: 0, icon: '', desc: ''},
				{ time: '3', maxTemp: 0, minTemp: 0, humidity: 0, icon: '', desc: ''}
			]}
		]
	};

	it('Should display the city and an empty list', () => {
		const component = create(<ForecastList {...props} />);
		const root = component.root;
		const parent = root.findByType('div');
		const h1 = parent.findByType('h1');
		const list = parent.findAllByProps({ className: 'forecast-day' });

		expect(h1.props.children).toBe(props.cityName);
		expect(list.length).toBe(props.list.length);
	});

	it('Should display the full list of days and weather', () => {
		const component = create(<ForecastList {...updatedProps} />);
		const root = component.root;
		const parent = root.findByType('div');
		const list = parent.findAllByProps({ className: 'forecast-day' });

		expect(list.length).toBe(updatedProps.list.length);

		const w0 = list[0].findAllByProps({ className: 'forecast' });
		const w1 = list[1].findAllByProps({ className: 'forecast' });
		const w2 = list[2].findAllByProps({ className: 'forecast' });
		const w3 = list[3].findAllByProps({ className: 'forecast' });

		expect(w0.length).toBe(updatedProps.list[0].forecast.length);
		expect(w1.length).toBe(updatedProps.list[1].forecast.length);
		expect(w2.length).toBe(updatedProps.list[2].forecast.length);
		expect(w3.length).toBe(updatedProps.list[3].forecast.length);
	});
});