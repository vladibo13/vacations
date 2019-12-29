import Actions from './action.config';
import mainAxios from '../../axios/mainAxios';
import { registerUserService, loginUserService } from '../service';

export const registerUser = (user: object) => {
	return async (dispatch: any) => {
		console.log('auth action user info ', user);
		const data = await registerUserService(user);
		console.log('data from auth action ', data);
		dispatch(registerUserAction(data));
	};
};

export const loginUser = (user: object) => {
	return async (dispatch: any) => {
		console.log('auth action user info ', user);
		const data = await loginUserService(user);
		console.log('data from auth action ', data);
		dispatch(loginUserAction(data));
	};
};

export const loginUserAction = (data: object) => ({
	type: Actions.LOGIN_USER,
	payload: data
});

export const registerUserAction = (data: object) => ({
	type: Actions.REGISTER_USER,
	payload: data
});
