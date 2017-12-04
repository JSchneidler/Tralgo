import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import 'typeface-roboto';

import * as reducers from './app/reducers';
import rootSaga from './app/sagas';
import registerServiceWorker from './registerServiceWorker';
import App from './app/containers/App';
import './index.css';

const history = createHistory(); // Create a history

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
	logger, // Any middleware that comes after the logger will be logged
	sagaMiddleware,
	routerMiddleware(history), // Used for intercepting and dispatching navigation actions
];

const store = createStore(
	combineReducers({
		...reducers, 
		form: formReducer,
		router: routerReducer,
	}),
	applyMiddleware(...middlewares), 
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();