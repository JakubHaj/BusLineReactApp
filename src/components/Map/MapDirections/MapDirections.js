import React, { Component } from 'react';
import { DirectionsRenderer } from 'react-google-maps';
import ErrorModal from '../../UI/ErrorModal';

class MapDirections extends Component {
    state = {
        directions: null,
        error: false
    }

    renderRouteMap() {
      const google = this.props.google;
      const DirectionsService = new google.maps.DirectionsService();
      const originLatLng = {lat: this.props.originPos.lat, lng: this.props.originPos.lng}
      const destinationLatLng = {lat: this.props.destPos.lat, lng: this.props.destPos.lng}
 
      DirectionsService.route({
        origin: originLatLng,
        destination: destinationLatLng,
        waypoints: this.props.waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          if(JSON.stringify({ directions: result }) !== JSON.stringify(this.state)) {
              this.setState({
                directions: result
              });
              const info = {
                startLoc: result.routes[0].legs[0].start_address,
                endLoc: result.routes[0].legs[0].end_address,
                distance: result.routes[0].legs[0].distance.text,
                stops: result.routes[0].legs[0].via_waypoint.length
              }
              this.props.onInfoAdd(info)
          }
        } else {
          this.setState({error: true})
          this.props.onRemove(this.props.destPos.id)
        }
      });
    }
    componentDidMount() {
      if(this.props.shouldRenderRoute) {
        this.renderRouteMap();
      }
    }

    componentDidUpdate(previousProps, previousState) {
      if (JSON.stringify(previousProps) !== JSON.stringify(this.props) && this.props.shouldRenderRoute) {
        this.renderRouteMap();
      }     
    }

    render() {
      let RenderRoute = null;

      const clearError = () => {
        this.setState({error: false})
      }

      if(this.props.shouldRenderRoute) {
        RenderRoute = (<DirectionsRenderer directions={this.state.directions}/>)
      }
        return (
          <div>
              {this.state.error ? <ErrorModal onClose={clearError}>Could not calculate route for given location!</ErrorModal> : null}
              {RenderRoute}
          </div>
        )
    }
}

export default MapDirections;