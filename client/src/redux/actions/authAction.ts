import Actions from './action.config';
import mainAxios from '../../axios/mainAxios';
import { registerUserService, loginUserService, verifyUserService } from '../service';

export const registerUser = (user: object) => {
	return async (dispatch: any) => {
		try {
			console.log('auth action user info ', user);
			const data = await registerUserService(user);
			console.log('data from auth action ', data);
			// if (data.error === 'error') throw 'register error';
			if (data.msg === 'error') throw 'register failed';
			console.log(data);
			dispatch(registerUserAction(data));
		} catch (ex) {
			console.log('error from register = ', ex);
			// dispatch(authUserErrorAction());
		}
	};
};

export const loginUser = (user: object) => {
	return async (dispatch: any) => {
		try {
			console.log('auth action user info ', user);
			const data = await loginUserService(user);
			if (data.msg === 'error') throw 'login failed';
			console.log('data from auth action ', data);
			dispatch(loginUserAction(data));
		} catch (error) {
			console.log('auth login error ');
			dispatch(authUserErrorAction());
		}
	};
};

export const verifyUser = () => {
	return async (dispatch: any) => {
		await dispatch(userLoadingAction());
		console.log('auth action user info ');
		const data = await verifyUserService();
		console.log('data from auth action ', data);
		dispatch(verifyUserAction(data));
	};
};

export const userLoadingAction = () => ({
	type: Actions.USER_LOADING
});
export const authUserErrorAction = () => ({
	type: Actions.AUTH_ERROR
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
