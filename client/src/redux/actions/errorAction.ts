import Actions from './action.config';

export const returnErrors = (msg: string, status: string) => {
	return {
		type: Actions.GET_ERRORS,
		payload: { msg, status }
	};
};

export const clearErrors = () => {
	return {
		type: Actions.CLEAR_ERRORS
	};
};
