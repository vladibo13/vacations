import Actions from '../actions/action.config';

const initialState = {
	msg: null,
	status: null,
	id: null
};

export default function errorReducer(state = initialState, action: any) {
	switch (action.type) {
		case Actions.GET_ERRORS: {
			return {
				msg: action.payload.msg,
				status: action.payload.status,
				id: action.payload.id
			};
		}
		case Actions.CLEAR_ERRORS: {
			return {
				msg: null,
				status: null,
				id: null
			};
		}
		default:
			return state;
	}
}
