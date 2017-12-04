import * as types from 'constants/actionTypes';

export function editPlace(placeId) {
    return {
        type: types.EDIT_PLACE,
        placeId,
    }
}

export function createNewPlace() {
    return {
        type: types.CREATE_NEW_PLACE,
    }
}

export function cancelEditPlace() {
    return {
        type: types.CANCEL_EDIT_PLACE,
    }
}

export function changeEditorView(view) {
    return {
        type: types.CHANGE_EDITOR_VIEW,
        view,
    }
}