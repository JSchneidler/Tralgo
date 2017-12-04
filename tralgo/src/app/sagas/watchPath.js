import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import * as types from 'constants/actionTypes';
import * as pathActions from 'actions/pathActions';

export function* loadPath(action) {
    console.log(action);
    const response = yield call(axios.post, 'http://localhost:3001/api/tralgo', action.options);

    yield put(pathActions.loadPathSuccess(response.data.path));
}

export default function* watchPath() {
    yield takeEvery(types.LOAD_PATH, loadPath);
}