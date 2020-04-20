import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import Location from './Location/Location';
import './DragAndDrop.css';


const SortableLocation = SortableElement(({place, onRemove}) => (
    <li className="DraggableItem">
      <Location 
        place={place}  
      />  
      <button 
        className="removeBtn" 
        onClick={() => onRemove(place.id)}
      >X
      </button>
    </li>
    )
  );

const SortableLocationContainer = SortableContainer(({places, onRemove, lineSaved}) => {
  return (
    <ul className={lineSaved ? 'DragAndDrop LineSaved' : 'DragAndDrop'}>
      {places.map((place, index) => (
        <div key={`item-${place.description}-${place.id}`}>
            <SortableLocation key={`item-${place.description}`} index={index} place={place} onRemove={onRemove} />
        </div>
      ))}
    </ul>
  );
});

const dragAndDrop = props => {
    return (
        <SortableLocationContainer places={props.places} onSortEnd={props.onSortEnd} onRemove={props.onRemove} lineSaved={props.lineSaved} />
    )
}

export default dragAndDrop;