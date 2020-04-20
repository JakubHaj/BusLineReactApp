import React, { Component } from "react";
import GoogleMap from '../components/Map/Map';
import { connect } from 'react-redux';
import * as locationActions from '../store/actions/locations';
import './Map.css'

class Map extends Component {
    render() {
        const markerPosition = this.props.markerPos ? {
            lat: this.props.markerPos.lat,
            lng: this.props.markerPos.lng,
        } : null
        
        const googleMapConfig = {
            defaultZoom: 12,
            center: {
              lat: markerPosition ? markerPosition.lat : 50.049683, 
              lng: markerPosition ? markerPosition.lng : 19.944544
            }
          }
        return (
            <div>
                <GoogleMap 
                    googleMapConfig={googleMapConfig} 
                    markerPosition={markerPosition} 
                    onRemove={this.props.onCoordinatesRemove} 
                    onInfoAdd={this.props.onLineInfoAdd}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        places: state.loc.places,
        markerPos: state.loc.markerPosition
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCoordinatesRemove: id => dispatch(locationActions.removeCoordinates(id)),
        onLineInfoAdd: (info) => dispatch(locationActions.addLineInfo(info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);