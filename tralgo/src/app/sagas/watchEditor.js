import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import * as types from 'constants/actionTypes';
import * as editorActions from 'actions/editorActions';
import * as placeActions from 'actions/placeActions';

export function* createNewPlace() {
    yield put(placeActions.setPlace({}));
}

export function* cancelEditPlace() {
    yield put(placeActions.clearPlace());
}

export function* editPlace(action) {
    yield put(placeActions.loadPlace(action.placeId));
}

export default function* watchEditor() {
    yield takeEvery(types.CREATE_NEW_PLACE, createNewPlace);
    yield takeEvery(types.CANCEL_EDIT_PLACE, cancelEditPlace);
    yield takeEvery(types.EDIT_PLACE, editPlace);
}