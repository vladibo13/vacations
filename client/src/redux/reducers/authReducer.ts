import Actions from '../actions/action.config';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	isLoading: false,
	user: null,
	isRegistred: null,
	error: '',
	status: null,
	msg: ''
};

export default function authReducer(state = initialState, action: any) {
	switch (action.type) {
		case Actions.USER_LOADING: {
			return {
				...state,
				isLoading: true
			};
		}
		case Actions.REGISTER_USER: {
			console.log('register user reducer...');
			console.log('from reducer payload ', action.payload);
			return {
				...state,
				isRegistred: true,
				isLoading: false,
				msg: action.payload.msg
			};
		}

		case Actions.LOGIN_USER: {
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				msg: action.payload.msg
			};
		}

		default:
			return state;
	}
}
