import axios from 'axios';
import mainAxios from '../axios/mainAxios';

export const registerUserService = async (user: any) => {
	try {
		const { data } = await mainAxios.post('/auth/register', user);
		return data;
	} catch (ex) {
		return { msg: 'error' };
	}
};

export const loginUserService = async (user: any) => {
	try {
		const { data } = await mainAxios.post('/auth/login', user);
		return data;
	} catch (ex) {
		return { msg: 'error' };
	}
};

export const verifyUserService = async () => {
	try {
		const { data } = await mainAxios.get('/auth/verify');
		return data;
	} catch (ex) {
		return { msg: 'error' };
	}
};

export const getAllVacationsService = async () => {
	try {
		const { data } = await mainAxios.get('/vacations');
		return data;
	} catch (ex) {
		return { msg: ex };
	}
};

export const getAllVacationsFiltredService = async (id: number) => {
	try {
		const { data } = await mainAxios.post('/vacations/filtred', { userID: id });
		return data;
	} catch (ex) {
		return { msg: ex };
	}
};

export const deleteVacationService = async (vacationID: number, userID: number) => {
	try {
		const { data } = await mainAxios.delete('/vacations', { data: { vacationID, userID } });
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

export const getChartDataService = async () => {
	try {
		const { data } = await mainAxios.get('/chart');
		return data;
	} catch (ex) {
		return { msg: ex };
	}
};

export const followVacationService = async (userID: number, vacationID: number) => {
	try {
		const { data } = await mainAxios.post('/follow', { userID, vacationID });
		return data;
	} catch (ex) {
		return { msg: ex };
	}
};

export const unfollowVacationService = async (userID: number, vacationID: number) => {
	try {
		const { data } = await mainAxios.delete('/follow', { data: { userID, vacationID } });
		return data;
	} catch (ex) {
		return { msg: ex };
	}
};

export const updateVacationService = async (formData: object) => {
	try {
		const { data } = await mainAxios.put('/vacations', { ...formData });
		return data;
	} catch (ex) {
		return { msg: ex };
	}
};
