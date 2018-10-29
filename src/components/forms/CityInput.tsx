import * as React from 'react';
import AutocompleteItem from './AutocompleteItem';
import Worker from 'worker-loader!../../workers/cities.worker';

import './CityInput.css';

const AUTOCOMPLETE_LIMIT = 5;

interface CityInputProps {
	placeholder: string;
	loadNewCity: (city: City) => void;
	autocomplete?: boolean;
}

interface CityInputState {
	city: City;
	autocomplete: City[];
}

class CityInput extends React.Component<CityInputProps, CityInputState> {
	private worker;

	state = {
		city: {
			name: '',
			id: undefined
		},
		autocomplete: []
	};

	componentDidMount() {
		if (this.props.autocomplete) this.createWorker();
	}

	componentWillUnmount() {
		if (this.worker) this.worker.close();
	}

	render() {
		const { placeholder } = this.props;
		const { city } = this.state;

		return (
			<div className='city-input'>
				<input
					type='text'
					placeholder={placeholder}
					value={city.name}
					onChange={this.onChange}
				/>
				{this.renderAutocomplete()}
				<button onClick={this.updateWeather}>Ok</button>
			</div>
		);
	}

	private createWorker() {
		this.worker = new Worker();
	
		this.worker.addEventListener('message', e => {
			const { autocomplete } = this.state;
			if (autocomplete.length >= AUTOCOMPLETE_LIMIT) {
				this.worker.postMessage('');
			} else {
				const cities: City[] = this.state.autocomplete;
				cities.push(e.data);
				this.setState({ autocomplete: cities });
			}
		});
	}

	private renderAutocomplete() {
		const { autocomplete } = this.state;

		if (!autocomplete.length) return;

		return (
			<div className='city-input__autocomplete'>
				{autocomplete.map(this.renderCity)}
			</div>
		);
	}

	private renderCity = (city: City) => {
		return <AutocompleteItem key={city.id} onClick={this.updateCity} city={city} />
	}

	private updateCity = (city: City) => {
		this.setState({ city, autocomplete: [] });
	}

	private updateWeather = () => {
		this.props.loadNewCity(this.state.city);
		this.setState({
			city: { name: '', id: undefined },
			autocomplete: []
		});
	}

	private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const city = {
			name: e.currentTarget.value,
			id: undefined
		};
		if (this.props.autocomplete) this.updateAutocomplete();
		this.setState({ city });
	}

	private updateAutocomplete = () => {
		if (!this.worker) return;

		this.setState({ autocomplete: [] });
		this.worker.postMessage(this.state.city.name);
	}
}

export default CityInput;
