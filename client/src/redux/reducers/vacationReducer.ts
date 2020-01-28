import Actions from '../actions/action.config';

const initialState = {
	vacations: [],
	likedVacations: [],
	msgVacation: '',
	isLoading: false
};

export default function vacationReducer(state = initialState, action: any) {
	switch (action.type) {
		case Actions.GET_VACATIONS: {
			return {
				...state,
				vacations: action.payload.vacations,
				isLoading: false
			};
		}

		case Actions.VACATIONS_LOADING: {
			return {
				...state,
				isLoading: true
			};
		}

		case Actions.GET_LIKED_VACATIONS: {
			return {
				...state,
				vacations: action.payload.vacations,
				isLoading: false
			};
		}

		case Actions.CLEAR_VACATIONS: {
			return {
				...state,
				vacations: [],
				isLoading: false,
				msgVacation: ''
			};
		}

		case Actions.DELETE_VACATION: {
			console.log('PAYLOAD = ', action.payload);
			return {
				...state,
				msgVacation: action.payload.msg,
				vacations: action.payload.vacations
			};
		}

		case Actions.ADD_VACATION: {
			return {
				...state,
				msgVacation: action.payload.msg,
				vacations: action.payload.vacations
			};
		}

		case Actions.UPDATE_VACATION: {
			return {
				...state,
				msgVacation: action.payload.msg,
				vacations: action.payload.vacations
			};
		}

		case Actions.FOLLOW_VACATION: {
			return {
				...state,
				msgVacation: action.payload.msg
			};
		}

		case Actions.UNFOLLOW_VACATION: {
			return {
				...state,
				msgVacation: action.payload.msg
			};
		}

		default:
			return state;
	}
}
