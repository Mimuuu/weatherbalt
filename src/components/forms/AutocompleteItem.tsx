import * as React from 'react';

interface AutocompleteItemProps {
	city: City;
	onClick: (city: City) => void;
}

export default class AutocompleteItem extends React.PureComponent<AutocompleteItemProps> {

	render() {
		const { name } = this.props.city;
		return (
			<p className='autocomplete-item' onClick={this.onClick}>
				{name}
			</p>
		)
	}

	private onClick = () => {
		this.props.onClick(this.props.city);
	}
}