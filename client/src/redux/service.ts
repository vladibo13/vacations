import axios from 'axios';
import mainAxios from '../axios/mainAxios';

export const registerUserService = async (user: any) => {
	const { data } = await mainAxios.post('/auth/register', user);
	return data;
};

export const loginUserService = async (user: any) => {
	const { data } = await mainAxios.post('/auth/login', user);
	return data;
};

export const verifyUserService = async () => {
	const { data } = await mainAxios.get('/auth/verify');
	return data;
};

export const getAllVacationsService = async () => {
	const { data } = await mainAxios.get('/vacations');
	return data;
};

export const getAllVacationsFiltredService = async (id: number) => {
	const { data } = await mainAxios.post('/vacations/filtred', { userID: id });
	return data;
};

export const deleteVacationService = async (vacationID: number) => {
	const { data } = await mainAxios.delete('/vacations', { data: { vacationID } });
	return data;
};

export const addVacationService = async (vac: object) => {
	const { data } = await mainAxios.post('/vacations', vac);
	return data;
};

export const getChartDataService = async () => {
	const { data } = await mainAxios.get('/chart');
	return data;
};

export const followVacationService = async (userID: number, vacationID: number) => {
	const { data } = await mainAxios.post('/follow', { userID, vacationID });
	return data;
};

export const unfollowVacationService = async (userID: number, vacationID: number) => {
	const { data } = await mainAxios.delete('/follow', { data: { userID, vacationID } });
	return data;
};

export const updateVacationService = async (formData: object) => {
	const { data } = await mainAxios.put('/vacations', { ...formData });
	return data;
};
