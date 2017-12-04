import * as types from 'constants/actionTypes';

export function setMapZoom(zoom) {
    return {
        type: types.SET_MAP_ZOOM,
        zoom,
    }
}

export function setMapCenter(center) {
    return {
        type: types.SET_MAP_CENTER,
        center,
    }
}