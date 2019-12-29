import axios from 'axios';

const apiURL = 'http://localhost:5000';
const mainAxios = axios.create({
	baseURL: `${apiURL}`
});

mainAxios.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers['Authorization'] = token;
	}
	return config;
});

export default mainAxios;
