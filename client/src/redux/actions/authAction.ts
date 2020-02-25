import Actions from './action.config';
import { registerUserService, loginUserService, verifyUserService } from '../service';
import { returnErrors, clearErrors } from './errorAction';

export const registerUser = (user: object, history: Array<any>) => {
	return async (dispatch: Function) => {
		try {
			const data = await registerUserService(user);
			dispatch({
				type: Actions.REGISTER_USER,
				payload: data
			});

			if (data.msg === 'redirect' && data.redirect) {
				history.push('/login');
				return;
			}
		} catch (ex) {
			dispatch({ type: Actions.AUTH_ERROR });
		}
	};
};

export const loginUser = (user: object, history: Array<any>) => {
	return async (dispatch: Function) => {
		try {
			const data = await loginUserService(user);

			dispatch({
				type: Actions.LOGIN_USER,
				payload: data
			});

			const token = localStorage.getItem('token');
			if (data.msg === 'redirect' && token && data.redirect) {
				history.push('/main');
				return;
			}
		} catch (ex) {
			dispatch({ type: Actions.AUTH_ERROR });
		}
	};
};

export const logoutUser = () => {
	return async (dispatch: Function) => {
		try {
			dispatch({ type: Actions.LOGOUT_USER });
			dispatch(clearErrors());
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};

export const verifyUser = () => {
	return async (dispatch: Function) => {
		try {
			await dispatch({ type: Actions.USER_LOADING });
			const data = await verifyUserService();
			dispatch({
				type: Actions.VERIFY_USER,
				payload: data
			});
		} catch (ex) {
			dispatch(returnErrors(ex.response.statusText, ex.response.status));
		}
	};
};
