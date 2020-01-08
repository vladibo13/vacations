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

export const verifyUserService = async () => {
	try {
		console.log('user from service =  ');
		const { data } = await mainAxios.get('/auth/verify');
		console.log('data from service ', data);
		return data;
	} catch (ex) {
		return { msg: 'error' };
	}
};

export const getAllVacationsService = async () => {
	try {
		console.log('user from service =  ');
		const { data } = await mainAxios.get('/vacations');
		console.log('data from service ', data);
		return data;
	} catch (ex) {
		return { msg: ex };
	}
};

export const deleteVacationService = async (id: number) => {
	try {
		const { data } = await mainAxios.delete('/vacations', { data: { id } });
		return data;
	} catch (ex) {
		return { msg: ex };
	}
};

export const addVacationService = async (vac: object) => {
	try {
		const { data } = await mainAxios.post('/vacations', vac);
		return data;
	} catch (ex) {
		return { msg: ex };
	}
};
