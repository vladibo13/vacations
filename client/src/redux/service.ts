import axios from 'axios';
import mainAxios from '../axios/mainAxios';

export const registerUserService = async (user: any) => {
	try {
		console.log('user from service =  ', user);
		const { data } = await mainAxios.post('/auth/register', user);
		console.log('data from service ', data);
		return data;
	} catch (ex) {
		return { msg: 'error' };
	}
};

export const loginUserService = async (user: any) => {
	try {
		console.log('user from service =  ', user);
		const { data } = await mainAxios.post('/auth/login', user);
		console.log('data from service ', data);
		return data;
	} catch (ex) {
		return { msg: 'error' };
	}
};
