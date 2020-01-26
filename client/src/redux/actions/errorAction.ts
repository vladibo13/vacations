import Actions from './action.config';

export const returnErrors = (data: object) => {
	return {
		type: Actions.GET_ERRORS,
		payload: data
	};
};

export const clearErrors = () => {
	return {
		type: Actions.CLEAR_ERRORS
	};
};
