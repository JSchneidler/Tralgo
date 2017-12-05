import * as types from 'constants/actionTypes';

const initialState = {
    creating: false,
    view: 'place',
};

export default (state = initialState, action={}) => {
	switch(action.type) {
		case types.CREATE_NEW_PLACE:
		case types.EDIT_PLACE: // TODO: Change to EDIT_PLACE_SUCCESS to be dispatched on successful API call
            return {
                ...state,
                creating: true,
            };
        //case types.CANCEL_EDIT_PLACE: TODO: Needed? Or use CLEAR_PLACE?
        case types.CLEAR_PLACE: // TODO: Move to saga?
            return initialState;
        case types.CHANGE_EDITOR_VIEW:
            return {
                ...state,
                view: action.view,
            }
		default:
			return state;
	}
}
