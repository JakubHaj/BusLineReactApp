import React, {Component} from 'react';
import { connect } from 'react-redux';
import PlacesComponent from '../../components/Places/Places';
import './Places.css';
import * as locationActions from '../../store/actions/locations';

class Places extends Component  {

    validateIfPlaceAdded(value, places) {
        let isValid = true;
        if (places.length > 0) {
            places.map((place) => {
                if (JSON.stringify(place.description) === JSON.stringify(value)) {
                    isValid = false;
                }
            })
        }
        return isValid;
    }

    addCoordinates = (placeToAdd) => {
        this.props.onCoordinatesAdd({lat: placeToAdd.lat, lng: placeToAdd.lng }, placeToAdd.description, placeToAdd.id)
    }

    render() {
    let place;

    if (this.props && this.props?.places) {
        place = this.props.places[this.props.places.length - 1]
    }
        
    return (
        <div className="Places">
            <PlacesComponent
                addCoordinates={this.addCoordinates}
                validateIfPlaceAdded={this.validateIfPlaceAdded}
                places={this.props.places}
                lineSaved={this.props.lineSaved}
            />
        </div>
    );
    }
};
const mapStateToProps = (state) => {
    return {
        places: state.loc.places,
        markerPos: state.loc.markerPosition,
        lineSaved: state.loc.lineSaved
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCoordinatesAdd: (latLng, description, id) => dispatch(locationActions.addCoordinates(latLng, description, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Places);