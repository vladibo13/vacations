import Actions from '../actions/action.config';

const initialState = {
	isAuthenticated: null,
	isLoading: false,
	user: null,
	isRegistred: null,
	error: '',
	status: 'loading',
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

		case Actions.USER_LOADING: {
			return {
				...state,
				isLoading: true
			};
		}

		case Actions.AUTH_ERROR: {
			return {
				...state,
				msg: '',
				isRegistred: false
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
			if (action.payload.token) localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				msg: action.payload.msg
			};
		}

		case Actions.VERIFY_USER: {
			console.log(action.payload.status);
			return {
				...state,
				isLoading: false,
				status: action.payload.status
			};
		}

		default:
			return state;
	}
}
