import * as types from 'constants/actionTypes';

export function loadPath(options) {
    return {
        type: types.LOAD_PATH,
        options,
    }
}

export function loadPathSuccess(path) {
    return {
        type: types.LOAD_PATH_SUCCESS,
        path,
    }
}