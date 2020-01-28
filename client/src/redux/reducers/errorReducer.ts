import Actions from '../actions/action.config';

const initialState = {
	msg: {},
	status: null,
	id: null
};

export default function errorReducer(state = initialState, action: any) {
	switch (action.type) {
		case Actions.GET_ERRORS: {
			console.log('ERROR REDUCER = ', action.payload);
			return {
				msg: action.payload.msg,
				status: action.payload.status,
				id: action.payload.id
			};
		}
		case Actions.CLEAR_ERRORS: {
			return {
				msg: {},
				status: null,
				id: null
			};
		}
		default:
			return state;
	}
}
