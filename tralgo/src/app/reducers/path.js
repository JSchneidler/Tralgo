import * as types from 'constants/actionTypes';

export default (state = null, action={}) => {
	switch(action.type) {
		case types.CLEAR_PLACE: // TODO: Move to saga
			return null;
		case types.LOAD_PATH_SUCCESS:
			return action.path;
		default:
			return state;
	}
}
