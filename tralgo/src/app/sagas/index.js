import { all } from 'redux-saga/effects';

import watchPlace from './watchPlace';
import watchPath from './watchPath';
import watchEditor from './watchEditor';

export default function* rootSaga() {
    yield all([
        watchPlace(),
        watchPath(),
        watchEditor(),
    ]);
}

