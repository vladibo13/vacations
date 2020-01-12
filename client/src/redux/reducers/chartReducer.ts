import Actions from '../actions/action.config';

const initialState = {
	vacationsData: [],
	followersData: []
};

export default function vacationReducer(state = initialState, action: any) {
	switch (action.type) {
		case Actions.GET_CHART_DATA: {
			console.log(action.payload);
			return {
				...state,
				vacationsData: action.payload.destinations,
				followersData: action.payload.followers
			};
		}

		default:
			return state;
	}
}
