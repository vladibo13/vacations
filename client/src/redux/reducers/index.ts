import { combineReducers } from 'redux';
import authReducer from './authReducer';
import vacationReducer from './vacationReducer';

export default combineReducers({
	auth: authReducer,
	vacation: vacationReducer
});
