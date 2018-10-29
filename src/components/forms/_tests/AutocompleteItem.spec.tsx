import * as React from 'react';
import { create } from 'react-test-renderer';
import AutocompleteItem from '../AutocompleteItem';

describe('AutocompleteItem', () => {

	const click = () => console.log();
	const city = { name: 'City name '};

	it('Should display the name of the city', () => {
		const component = create(<AutocompleteItem city={city} onClick={click} />);
		const root = component.root;
		const parent = root.findByType('p');

		expect(parent.props.children).toBe(city.name);
	});
});