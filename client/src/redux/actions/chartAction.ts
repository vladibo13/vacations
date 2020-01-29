import Actions from './action.config';
import { getChartDataService } from '../service';
import { returnErrors } from './errorAction';

export const getChart = () => {
	return async (dispatch: Function) => {
		dispatch({ type: Actions.CHART_LOADING });
		try {
			const data = await getChartDataService();

			dispatch({
				type: Actions.GET_CHART_DATA,
				payload: data
			});
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};
