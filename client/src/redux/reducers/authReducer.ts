import Actions from '../actions/action.config';

const initialState = {
	isAuthenticated: null,
	isLoading: false,
	user: null,
	isRegistred: null,
	error: '',
	status: false,
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

		case Actions.LOGOUT_USER: {
			return {
				...state,
				isAuthenticated: null,
				isLoading: false,
				user: null,
				isRegistred: null,
				error: '',
				status: false,
				msg: ''
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
				msg: action.payload.msg
			};
		}

		case Actions.REGISTER_USER: {
			return {
				...state,
				isRegistred: true,
				isLoading: false,
				msg: action.payload.msg,
				error: ''
			};
		}

		case Actions.LOGIN_USER: {
			if (action.payload.token) localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				msg: action.payload.msg,
				error: ''
			};
		}

		case Actions.VERIFY_USER: {
			return {
				...state,
				isLoading: false,
				status: action.payload.status,
				user: action.payload.user
			};
		}

		default:
			return state;
	}
}
