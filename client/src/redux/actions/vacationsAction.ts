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
		try {
			const data = await getAllVacationsService();
			dispatch({
				type: Actions.GET_VACATIONS,
				payload: data
			});
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const getVacationsFiltred = (id: number) => {
	return async (dispatch: any) => {
		try {
			const data = await getAllVacationsFiltredService(id);
			dispatch({
				type: Actions.GET_LIKED_VACATIONS,
				payload: data
			});
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const deleteVacation = (vacationID: number, userID: number) => {
	return async (dispatch: any) => {
		try {
			const data = await deleteVacationService(vacationID, userID);
			dispatch({
				type: Actions.DELETE_VACATION,
				payload: data
			});
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const addVacation = (vac: object) => {
	return async (dispatch: any) => {
		try {
			const data = await addVacationService(vac);
			dispatch({
				type: Actions.ADD_VACATION,
				payload: data
			});
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const updateVacation = (formData: object) => {
	return async (dispatch: Function) => {
		try {
			const { data } = await updateVacationService(formData);
			dispatch({
				type: Actions.UPDATE_VACATION,
				payload: data
			});
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const clearVacations = () => {
	return async (dispatch: Function) => {
		try {
			dispatch({ type: Actions.CLEAR_VACATIONS });
		} catch (ex) {
			console.log(ex);
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
			console.log(ex);
		}
	};
};

export const unfollowVacation = (userID: number, vacationID: number) => {
	return async (dispatch: Function) => {
		try {
			const data = await unfollowVacation(userID, vacationID);
			dispatch({
				type: Actions.UNFOLLOW_VACATION,
				payload: data
			});
		} catch (ex) {
			console.log(ex);
		}
	};
};
// export const updateVacationAction = (data: object) => ({
// 	type: Actions.UPDATE_VACATION,
// 	payload: data
// });
// export const clearVacationsAction = () => ({
// 	type: Actions.CLEAR_VACATIONS
// });

// export const addVacationAction = (data: object) => ({
// 	type: Actions.ADD_VACATION,
// 	payload: data
// });

// export const getAllVacationsAction = (data: object) => ({
// 	type: Actions.GET_VACATIONS,
// 	payload: data
// });

// export const deleteVacationsAction = (data: object) => ({
// 	type: Actions.DELETE_VACATION,
// 	payload: data
// });
// export const getVacationsFiltredAction = (data: object) => ({
// 	type: Actions.GET_LIKED_VACATIONS,
// 	payload: data
// });
