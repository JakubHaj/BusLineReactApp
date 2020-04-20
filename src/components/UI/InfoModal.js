import React from 'react';

import './InfoModal.css';

const InfoModal = React.memo(props => {
  return (
    <React.Fragment>
      <div className="backdropInfo" onClick={props.onClose} />
      <div className="info-modal">
        <h2>Line info</h2>
            <h3>Start location:</h3>
            <p>{props.info.startLoc}</p>
            <h3>End location:</h3>
            <p>{props.info.endLoc}</p>
            <h3>Distance:</h3>
            <p>{props.info.distance}</p>
            <h3>Stops:</h3>
            <p>{props.info.stops}</p>
        <div className="info-modal__actions">
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default InfoModal;
