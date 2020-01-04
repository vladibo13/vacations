import Actions from '../actions/action.config';

const initialState = {
	vacations: []
};

export default function vacationReducer(state = initialState, action: any) {
	switch (action.type) {
		case Actions.GET_VACATIONS: {
			return {
				...state,
				vacations: action.payload.vacations
			};
		}

		default:
			return state;
	}
}
