import Actions from './action.config';
import { getChartDataService } from '../service';

export const getChart = () => {
	return async (dispatch: Function) => {
		try {
			const data = await getChartDataService();
			console.log('data from charts action = ', data);
			dispatch(getChartDataAction(data));
		} catch (ex) {
			console.log(ex);
		}
	};
};

export const getChartDataAction = (data: object) => ({
	type: Actions.GET_CHART_DATA,
	payload: data
});
