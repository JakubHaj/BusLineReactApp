import React from 'react';
import './Location.css';

const location = props => {
    return (
        <div className="Location" key={props.place.description}>
            <div className="TextContainer">
                <div className="TextContainer1">
                    <div>{props.place.description}</div>
                </div>
            </div>
        </div>
    )
}

export default location;