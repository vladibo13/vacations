import Actions from '../actions/action.config';

const initialState = {
	vacationsData: [],
	followersData: [],
	isLoading: false
};

export default function vacationReducer(state = initialState, action: any) {
	switch (action.type) {
		case Actions.GET_CHART_DATA: {
			return {
				...state,
				vacationsData: action.payload.destinations,
				followersData: action.payload.followers,
				isLoading: false
			};
		}

		case Actions.CHART_LOADING: {
			return {
				...state,
				isLoading: true
			};
		}

		default:
			return state;
	}
}
