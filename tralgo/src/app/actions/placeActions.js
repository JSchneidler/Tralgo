import * as types from 'constants/actionTypes';

export function loadPlace(placeId) {
    return {
        type: types.LOAD_PLACE,
        placeId,
    }
}

export function loadPlaceSuccess(place) {
    return {
        type: types.LOAD_PLACE_SUCCESS,
        place,
    }
}

export function setPlace(place) {
    return {
        type: types.SET_PLACE,
        place,
    }
}

export function clearPlace() {
    return {
        type: types.CLEAR_PLACE,
        place: null,
    }
}

export function addPlaceNode(nodeType, node) {
    return {
        type: types.ADD_PLACE_NODE,
        nodeType,
        node,
    }
}

export function addPlaceNodeSuccess(nodeType, node) {
    return {
        type: types.ADD_PLACE_NODE_SUCCESS,
        nodeType,
        node,
    }
}

export function updatePlaceProperty(property, value) {
    return {
        type: types.UPDATE_PLACE_PROPERTY,
        property,
        value,
    }
}

export function updatePlaceCenter(latOrLng, value) {
    return {
        type: types.UPDATE_PLACE_CENTER,
        latOrLng,
        value,
    }
}

export function updatePlaceNode(nodeType, nodeId, property, value) {
    return {
        type: types.UPDATE_PLACE_NODE,
        nodeType,
        nodeId,
        property,
        value,
    }
}

export function updateEdgePolyline(edgeId, coordinateIndex, field, value) {
    return {
        type: types.UPDATE_EDGE_POLYLINE,
        edgeId,
        coordinateIndex,
        field,
        value,
    };
}

export function savePlace() {
    return {
        type: types.SAVE_PLACE,
    }
}

export function savePlaceSuccess() {
    return { type: types.SAVE_PLACE_SUCCESS };
}