import * as actionTypes from '../actions/actionTypes'

const initialState = {
    places: [],
    markerPosition: null,
    lineSaved: false,
    lineInfo: {
        startLoc: null,
        endLoc: null,
        distance: null,
        stops: null
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_LOCATION:
            const placesObj = {
                description: action.description,
                ...action.latLng,
                id: action.id
            }
            const newArr = state.places.concat(placesObj);
            const newMarkerPos = state.places.length === 0 ? placesObj : null;
            return {
                ...state,
                places: newArr,
                markerPosition: newMarkerPos
            }
        case actionTypes.REMOVE_LOCATION:
            const newState = state.places.filter((place) => {
                //return (place.description !== action.description)
                return (place.id !== action.id)
            });
            const onRemoveMarkerPos = newState.length === 1 ? newState[0] : null;
            return {
                ...state,
                places: newState,
                markerPosition: onRemoveMarkerPos
            }
        case actionTypes.SWITCH_LOCATION:
            return {
                ...state,
                places: action.places
            }
        case actionTypes.ADD_LINE_INFO:
            return {
                ...state,
                lineInfo: action.info
            }
        case actionTypes.SAVE_LINE:
        return {
                ...state,
                lineSaved: action.lineSaved
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;