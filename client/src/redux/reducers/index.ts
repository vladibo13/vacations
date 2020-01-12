import { combineReducers } from 'redux';
import authReducer from './authReducer';
import vacationReducer from './vacationReducer';
import chartReducer from './chartReducer';

export default combineReducers({
	auth: authReducer,
	vacation: vacationReducer,
	chart: chartReducer
});
