import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as locationActions from '../../store/actions/locations';
import arrayMove from 'array-move'
import Places from '../Places/Places';
import LeftInfoPanel from '../../components/LeftInfoInterface/LeftInfoPanel'
import './Interface.css';

class Interface extends Component {
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.props.onCoordinatesSwitch(arrayMove(this.props.places, oldIndex, newIndex));
    }
    
    render() {
        return (
            <div className="Interface">
                <Places />
                <LeftInfoPanel 
                    places={this.props.places} 
                    info={this.props.info}
                    onSortEnd={this.onSortEnd} 
                    onRemove={this.props.onCoordinatesRemove}
                    onSave={this.props.onCoordinatesAdd}
                    lineSaved={this.props.lineSaved}
                    onLineSave={this.props.onLineSave}
                />
            </div>
        )
    }   
}

const mapStateToProps = state => {
    return {
        places: state.loc.places,
        info: state.loc.lineInfo,
        lineSaved: state.loc.lineSaved
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCoordinatesRemove: id => dispatch(locationActions.removeCoordinates(id)),
        onCoordinatesSwitch: (places) => dispatch(locationActions.switchCoordinates(places)),
        onCoordinatesAdd: (latLng, description) => dispatch(locationActions.addCoordinates(latLng, description)),
        onLineSave: (lineSaved) => dispatch(locationActions.saveLine(lineSaved))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Interface);