import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { withProps  } from 'recompose';
import { Component } from 'react';
import MapDirections from './MapDirections/MapDirections'
import { connect } from 'react-redux';
import Marker from './MapDirections/Marker/Marker';
import './Map.css'

const google = window.google;

class Map extends Component {
  render() {

    let waypointsObj = [];
    let destLatLng = null;
    let shouldRenderRoute = false;

    const originLatLng = this.props.places[0];
    destLatLng = this.props.places[this.props.places.length - 1]
    if(this.props.places.length - 1 > 0) {
      shouldRenderRoute= true;
    }

    //waypoints
    if(this.props.places.length >= 3) {
      const waypointsArr = this.props.places.slice(1, this.props.places.length - 1);
      waypointsObj = waypointsArr.map(waypoint => {
        return {location: {lat: waypoint.lat, lng: waypoint.lng}, stopover: false}
      })
    }

    //marker 
    const MarkerLoc = this.props.markerPosition ? <Marker markerPosition={this.props.markerPosition} /> : null;
    return (
      <GoogleMap 
        defaultZoom={this.props.googleMapConfig.defaultZoom} 
        center={this.props.googleMapConfig.center}
      >
          <MapDirections 
            google={google}
            originPos={originLatLng}
            destPos={destLatLng} 
            waypoints={waypointsObj}
            shouldRenderRoute={shouldRenderRoute}
            onRemove={this.props.onRemove}
            onInfoAdd={this.props.onInfoAdd}
          />
          {MarkerLoc}
      </GoogleMap>)
  }
}

const mapStateToProps = (state) => {
  return {
      places: state.loc.places,
      markerPos: state.loc.markerPosition
  }
}

export default connect(mapStateToProps)(withProps({
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div className="Map" />,
  mapElement: <div style={{ height: `100%` }} />
})(withGoogleMap(Map)));