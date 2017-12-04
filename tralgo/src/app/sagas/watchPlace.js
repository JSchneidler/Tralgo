import { takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import * as types from 'constants/actionTypes';
import * as placeActions from 'actions/placeActions';

const selectPlace = state => state.place;
const selectPlaceUpdates = state => state.place.updates;

export function* loadPlace(action) {
    const response = yield call(axios.get, `http://localhost:3001/api/places/${action.placeId}`);

    yield put(placeActions.loadPlaceSuccess(response.data));
}

export function* setPlace(action) {
    yield put(placeActions.setPlace(action.place));
}

export function* addPlaceNode(action) {
    const place = yield select(selectPlace);

    const response = yield call(axios.post, `http://localhost:3001/api/places/${place.id}/addNode`, {
        nodeType: action.nodeType,
        node: action.node,
    });

    yield put(placeActions.addPlaceNodeSuccess(action.nodeType, response.data));
}

export function* savePlace(action) {
    const placeUpdates = yield select(selectPlaceUpdates);

    const response = yield call(axios.post, 'http://localhost:3001/api/places', placeUpdates);

    yield put(placeActions.savePlaceSuccess());
}

export default function* watchPlace() {
    yield takeEvery(types.LOAD_PLACE, loadPlace);
    yield takeEvery(types.LOAD_PLACE_SUCCESS, setPlace);
    yield takeEvery(types.ADD_PLACE_NODE, addPlaceNode)
    yield takeEvery(types.SAVE_PLACE, savePlace)
}