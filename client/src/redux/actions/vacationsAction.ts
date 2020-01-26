import Actions from './action.config';
import {
	getAllVacationsService,
	deleteVacationService,
	addVacationService,
	getAllVacationsFiltredService
} from '../service';

export const getVacations = () => {
	return async (dispatch: Function) => {
		try {
			const data = await getAllVacationsService();
			console.log('data from vacations actions = ', data);
			dispatch(getAllVacationsAction(data));
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const getVacationsFiltred = (id: number) => {
	return async (dispatch: any) => {
		try {
			console.log('hello from filtred = ', id);
			const data = await getAllVacationsFiltredService(id);
			console.log('data from vacations actions filtred = ', data);
			dispatch(getVacationsFiltredAction(data));
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const deleteVacation = (vacationID: number, userID: number) => {
	return async (dispatch: any) => {
		try {
			const data = await deleteVacationService(vacationID, userID);
			console.log('data from vacations actions = ', data);
			dispatch(deleteVacationsAction(data));
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const addVacation = (vac: object) => {
	return async (dispatch: any) => {
		try {
			console.log(vac);
			const data = await addVacationService(vac);
			console.log('data from vacations actions = ', data);
			dispatch(addVacationAction(data));
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const clearVacations = () => {
	return async (dispatch: any) => {
		try {
			dispatch(clearVacationsAction());
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const clearVacationsAction = () => ({
	type: Actions.CLEAR_VACATIONS
});

export const addVacationAction = (data: object) => ({
	type: Actions.ADD_VACATION,
	payload: data
});

export const getAllVacationsAction = (data: object) => ({
	type: Actions.GET_VACATIONS,
	payload: data
});

export const deleteVacationsAction = (data: object) => ({
	type: Actions.DELETE_VACATION,
	payload: data
});
export const getVacationsFiltredAction = (data: object) => ({
	type: Actions.GET_LIKED_VACATIONS,
	payload: data
});
