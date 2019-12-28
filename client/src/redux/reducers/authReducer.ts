import Actions from '../actions/action.config';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	isLoading: false,
	user: null
};

export default function authReducer(state = initialState, action: any) {
	switch (action.type) {
		case Actions.REGISTER_USER: {
			return {
				...state
			};
		}

		default:
			return state;
	}
}
