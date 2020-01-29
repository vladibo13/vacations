import Actions from './action.config';
import mainAxios from '../../axios/mainAxios';
import { registerUserService, loginUserService, verifyUserService } from '../service';
import { push } from 'react-router-redux';
import { useHistory } from 'react-router-dom';
import { returnErrors, clearErrors } from './errorAction';

export const registerUser = (user: object, history: Array<any>) => {
	return async (dispatch: Function) => {
		try {
			const data = await registerUserService(user);
			dispatch(registerUserAction(data));

			if (data.msg === 'redirect' && data.redirect) {
				history.push('/login');
				return;
			}
		} catch (ex) {
			console.log('error from register = ', ex);
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};

export const loginUser = (user: object, history: Array<any>) => {
	return async (dispatch: any) => {
		try {
			const data = await loginUserService(user);
			dispatch(loginUserAction(data));
			const token = localStorage.getItem('token');
			if (data.msg === 'redirect' && token && data.redirect) {
				history.push('/main');
				return;
			}
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};

export const logoutUser = () => {
	return async (dispatch: any) => {
		try {
			dispatch(logoutUserAction());
			dispatch(clearErrors());
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};

export const verifyUser = () => {
	return async (dispatch: Function) => {
		try {
			await dispatch(userLoadingAction());
			const data = await verifyUserService();
			dispatch(verifyUserAction(data));
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};
export const logoutUserAction = () => ({
	type: Actions.LOGOUT_USER
});

export const userLoadingAction = () => ({
	type: Actions.USER_LOADING
});
export const authUserErrorAction = (ex: string) => ({
	type: Actions.AUTH_ERROR,
	payload: ex
});
export const loginUserAction = (data: object) => ({
	type: Actions.LOGIN_USER,
	payload: data
});

export const registerUserAction = (data: object) => ({
	type: Actions.REGISTER_USER,
	payload: data
});

export const verifyUserAction = (data: object) => ({
	type: Actions.VERIFY_USER,
	payload: data
});
