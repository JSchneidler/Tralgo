import * as types from 'constants/actionTypes';

export default (state = null, action={}) => {
	switch(action.type) {
		case types.SET_MAP_ZOOM:
			return {
				...state,
				zoom: action.zoom,
			};
		case types.SET_MAP_CENTER:
			return {
				...state,
				center: action.center,
			}
		default:
			return state;
	}
}
