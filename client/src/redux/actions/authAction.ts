import Actions from './action.config';
import mainAxios from '../../axios/mainAxios';
import { registerUserService, loginUserService, verifyUserService } from '../service';
import { push } from 'react-router-redux';
import { useHistory } from 'react-router-dom';

export const registerUser = (user: object, history: any) => {
	return async (dispatch: Function) => {
		try {
			const data = await registerUserService(user);
			if (data.msg === 'error') throw 'register failed';
			dispatch(registerUserAction(data));

			if (data.msg === 'redirect') {
				history.push('/login');
				return;
			}
		} catch (ex) {
			console.log('error from register = ', ex);
			dispatch(authUserErrorAction(ex));
		}
	};
};

export const loginUser = (user: object, history: any) => {
	return async (dispatch: any) => {
		try {
			console.log('auth action user info ', user);
			const data = await loginUserService(user);
			if (data.msg === 'error') throw 'login failed';
			console.log('data from auth action ', data);
			dispatch(loginUserAction(data));
			const token = localStorage.getItem('token');
			if (data.msg === 'redirect' && token) {
				history.push('/');
				return;
			}
		} catch (ex) {
			console.log('auth login error ');
			dispatch(authUserErrorAction(ex));
		}
	};
};

export const logoutUser = () => {
	return async (dispatch: any) => {
		try {
			dispatch(logoutUserAction());
		} catch (ex) {
			dispatch(authUserErrorAction(ex));
		}
	};
};

export const verifyUser = () => {
	return async (dispatch: Function) => {
		await dispatch(userLoadingAction());
		console.log('auth action user info ');
		const data = await verifyUserService();
		console.log('data from auth action ', data);
		dispatch(verifyUserAction(data));
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
