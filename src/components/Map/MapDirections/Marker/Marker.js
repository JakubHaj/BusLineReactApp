import React from 'react';
import { Marker } from 'react-google-maps';

const positionMarker = (props) => {
    return (
    <Marker 
        key={1}
        position={{
          lat: props.markerPosition.lat, 
          lng: props.markerPosition.lng
        }}
    />
    )
}

export default positionMarker;