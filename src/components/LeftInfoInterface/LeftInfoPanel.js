import React, { Component } from 'react';
import DragAndDrop from './DragAndDrop/DragAndDrop';
import btnNext from '../../assets/btnNext.png';
import btnBack from '../../assets/btnBack.png'
import './LeftInfoPanel.css'
import InfoModal from '../UI/InfoModal';

class LeftInfoPanel extends Component {
    state = {
        showInfo: false,
        disableInfo: true,
        disableSave: true
    }

    showInfoHandler = () => {
        this.setState({showInfo: true})
    }

    modalClose = () => {
        this.setState({showInfo: false})
    }

    saveLineHandler = () => {
        if(this.props.lineSaved) {
            this.props.onRemove(this.props.places[this.props.places.length - 1].id);
            this.props.onLineSave(false);
        } else {
            const lastStop = this.props.places[0];
            if (lastStop) {
                this.props.onSave({lat: lastStop.lat,lng: lastStop.lng}, lastStop.description);
                this.props.onLineSave(true);
            }
        }
    }

    componentDidUpdate() {
        if (this.props.places.length > 1 && (this.state.disableInfo || this.state.disableSave)) {
            this.setState({disableInfo: false, disableSave: false})
        } else if (this.props.places.length < 2 && (!this.state.disableInfo || !this.state.disableSave)) {
            this.setState({disableInfo: true, disableSave: true})
        }
    }

    render () {
    return (
        <div className="LeftInfoPanel">
            {this.state.showInfo ? <InfoModal onClose={this.modalClose} info={this.props.info} /> : null}
            <div className="LineInfo">
                <span>Line 1</span>
                <div className="navBtns">
                    <img id="Back" src={btnBack} onClick={() => console.log('back')} alt='<' />
                    <img src={btnNext} onClick={() => console.log('next')} alt='>' />
                </div>
            </div>
            <DragAndDrop 
                places={this.props.places} 
                lineSaved={this.props.lineSaved}
                onSortEnd={this.props.onSortEnd} 
                onRemove={this.props.onRemove}
            />
            <div className="actionBtns">
                <button 
                    className="saveLineBtn" 
                    disabled={this.state.disableSave} 
                    onClick={this.saveLineHandler}
                >{this.props.lineSaved ? 'EDIT' : 'SAVE LINE'}</button>
                <button 
                    className="infoBtn" 
                    disabled={this.state.disableInfo} 
                    onClick={this.showInfoHandler}
                >LINE INFO</button>
            </div>
        </div>
    );
    }
};

export default LeftInfoPanel;