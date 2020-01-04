import Actions from './action.config';
import { getAllVacations } from '../service';

export const getVacations = () => {
	return async (dispatch: any) => {
		try {
			const data = await getAllVacations();
			console.log('data from vacations actions = ', data);
			dispatch(getAllVacationsAction(data));
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const getAllVacationsAction = (data: object) => ({
	type: Actions.GET_VACATIONS,
	payload: data
});
