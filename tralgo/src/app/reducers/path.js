import * as types from 'constants/actionTypes';

export default (state = null, action={}) => {
	switch(action.type) {
		case types.LOAD_PATH_SUCCESS:
			return action.path;
		default:
			return state;
	}
}
