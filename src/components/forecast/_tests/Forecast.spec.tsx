import * as React from 'react';
import { create } from 'react-test-renderer';
import Forecast from '../Forecast';

describe('Forecast', () => {

	const forecast = {
		time: 'time',
		maxTemp: 20,
		minTemp: 10,
		humidity: 50,
		icon: 'icon',
		desc: 'desc',
	};

	it('Should display all the required information', () => {
		const component = create(<Forecast forecast={forecast} />);
		const root = component.root;
		const parent = root.findByType('div');
		const time = parent.findByProps({ className: 'forecast__time'});
		const desc = parent.findByProps({ className: 'forecast__desc'});
		const icon = parent.findByType('img');
		const min = parent.findByProps({ className: 'forecast__metadata forecast__min'});
		const minContent = min.findAllByType('span');
		const max = parent.findByProps({ className: 'forecast__metadata forecast__max'});
		const maxContent = max.findAllByType('span');
		const humidity = parent.findByProps({ className: 'forecast__metadata forecast__humidity'});
		const humidityContent = humidity.findAllByType('span');

		expect(time.props.children).toBe(forecast.time);
		expect(desc.props.children).toBe(forecast.desc);
		expect(icon.props.src).toBe(forecast.icon);
		expect(icon.props.alt).toBe(forecast.desc);
		expect(minContent[1].children[0]).toBe(forecast.minTemp.toString());
		expect(maxContent[1].children[0]).toBe(forecast.maxTemp.toString());
		expect(humidityContent[1].children[0]).toBe(forecast.humidity.toString());

	});
});