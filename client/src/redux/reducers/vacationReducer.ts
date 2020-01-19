import Actions from '../actions/action.config';

const initialState = {
	vacations: [],
	likedVacations: [],
	msgVacation: ''
};

export default function vacationReducer(state = initialState, action: any) {
	switch (action.type) {
		case Actions.GET_VACATIONS: {
			return {
				...state,
				vacations: action.payload.vacations
			};
		}

		case Actions.GET_LIKED_VACATIONS: {
			return {
				...state,
				vacations: action.payload.vacations
			};
		}

		case Actions.CLEAR_VACATIONS: {
			return {
				...state,
				vacations: []
			};
		}

		case Actions.DELETE_VACATION: {
			return {
				...state,
				msgVacation: action.payload.msg
			};
		}

		case Actions.ADD_VACATION: {
			return {
				...state,
				msgVacation: action.payload.msg
			};
		}

		default:
			return state;
	}
}
