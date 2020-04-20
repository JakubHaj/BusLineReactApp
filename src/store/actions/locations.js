import * as actionTypes from './actionTypes';

const setMarkerCoordinates = (latLng, description) => {
    return {
        type: actionTypes.SET_MARKER_LOCATION,
        latLng,
        description
    }
}

const addCoordinates = (latLng, description, id) => {
    return {
        type: actionTypes.ADD_LOCATION,
        latLng,
        description,
        id
    }
}

const removeCoordinates = (id) => {
    return {
        type: actionTypes.REMOVE_LOCATION,
        id
    }
}

const switchCoordinates = (places) => {
    return {
        type: actionTypes.SWITCH_LOCATION,
        places
    }
}

const addLineInfo = (info) => {
    return {
        type: actionTypes.ADD_LINE_INFO,
        info
    }
}
const saveLine = (lineSaved) => {
    return {
        type: actionTypes.SAVE_LINE,
        lineSaved
    }
}


export { setMarkerCoordinates, addCoordinates, removeCoordinates, switchCoordinates, addLineInfo, saveLine }