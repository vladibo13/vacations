import Actions from './action.config';
import {
	getAllVacationsService,
	deleteVacationService,
	addVacationService,
	getAllVacationsFiltredService,
	updateVacationService,
	unfollowVacationService,
	followVacationService
} from '../service';
import { returnErrors, clearErrors } from './errorAction';

export const getVacations = () => {
	return async (dispatch: Function) => {
		dispatch({ type: Actions.VACATIONS_LOADING });
		try {
			const data = await getAllVacationsService();
			dispatch({
				type: Actions.GET_VACATIONS,
				payload: data
			});
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};

export const getVacationsFiltred = (id: number) => {
	return async (dispatch: Function) => {
		dispatch({ type: Actions.VACATIONS_LOADING });
		try {
			const data = await getAllVacationsFiltredService(id);
			dispatch({
				type: Actions.GET_LIKED_VACATIONS,
				payload: data
			});
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};

export const deleteVacation = (vacationID: number) => {
	return async (dispatch: Function) => {
		try {
			const data = await deleteVacationService(vacationID);
			dispatch({
				type: Actions.DELETE_VACATION,
				payload: data
			});
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};

export const addVacation = (vac: object) => {
	return async (dispatch: Function) => {
		try {
			const data = await addVacationService(vac);
			dispatch({
				type: Actions.ADD_VACATION,
				payload: data
			});
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};

export const updateVacation = (formData: object) => {
	return async (dispatch: Function) => {
		try {
			const data = await updateVacationService(formData);
			dispatch({
				type: Actions.UPDATE_VACATION,
				payload: data
			});
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};

export const clearVacations = () => {
	return async (dispatch: Function) => {
		try {
			dispatch({ type: Actions.CLEAR_VACATIONS });
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};

export const followVacation = (userID: number, vacationID: number) => {
	return async (dispatch: Function) => {
		try {
			const data = await followVacationService(userID, vacationID);
			dispatch({
				type: Actions.FOLLOW_VACATION,
				payload: data
			});
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};

export const unfollowVacation = (userID: number, vacationID: number) => {
	return async (dispatch: Function) => {
		try {
			const data = await unfollowVacationService(userID, vacationID);
			dispatch({
				type: Actions.UNFOLLOW_VACATION,
				payload: data
			});
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};
