import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import React, {Component} from 'react';
import './PlacesComponent.css'
import locationIcon from '../../assets/place-24px.png';
import magnifierIcon from '../../assets/search-24px.png'
import ErrorModal from '../UI/ErrorModal';

class Places extends Component {
    state = {
        address: '',
        error: false
    }

    constructor(props) {
        super(props);
        this.id = 1;
    }

    render() {
    const handleSelect = async (value) => {
        const result = await geocodeByAddress(value);
        const latLng = await getLatLng(result[0]);
        addCoordinatesHandler({ description: result[0].formatted_address, ...latLng, id: this.id })
        this.id++;
    }

    const clearError = () => {
        this.setState({error: false})
    }
    
    const addCoordinatesHandler = (placeToAdd) => {
        const isValid = this.props.validateIfPlaceAdded(placeToAdd.description, this.props.places);
        if (!isValid) {
            this.setState({error: true})
        } else {
            this.props.addCoordinates(placeToAdd);
        }
        this.setState({address: ''});
    }

    return (
        <div className="PlacesComponent">
            {this.state.error ? <ErrorModal onClose={clearError}>This address has already been added!</ErrorModal> : null}
            <PlacesAutocomplete 
                value={this.state.address} 
                onChange={(val) => (this.setState({address: val}))} 
                onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className={this.props.lineSaved ? 'InputDiv LineSaved' : 'InputDiv'}>
                            <input className="Input" { ...getInputProps({placeholder: "Type address", type: "text"}) } />
                            <img className="MagnifierIcon" src={magnifierIcon} alt="" />
                            <div className="Dropdown">
                                { loading ? <div>loading...</div> : null}

                                {suggestions.map((suggestion) => {
                                    const style = {
                                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                    }

                                    return <div className="DropdownItem" {...getSuggestionItemProps(suggestion, { style })}><img src={locationIcon} alt='' /><span>{suggestion.description}</span></div>
                                })}
                            </div>
                        </div>
                    )}
            </PlacesAutocomplete>
        </div>
    );
}
};

export default Places;