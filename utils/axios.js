import axios from 'axios';
import {getToken, showToast} from '.';

export const baseURL = process.env.BASE_URL;
const windowObj = typeof window !== 'undefined' && window;

class ApiService {
	constructor(contentType) {
		const instance = axios.create({
			baseURL,
			headers: {
				Accept: '*/*',
				//"Content-Type": "multipart/form-data",
				// "Content-Type": "application/json",
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Origin': baseURL,
			},
		});

		instance.interceptors.response.use(
			this.handleSuccess,
			this.handleError
		);
		instance.interceptors.request.use((config) => {
			const token = getToken();
			if (!token) return config;
			if (windowObj) {
				if (!navigator.onLine) {
					showToast('There is no network connection', 'error');
					throw new axios.Cancel('There is No Network Connection');
				} else {
					config.headers['Authorization'] = 'Bearer ' + token;
					return config;
				}
			}
		});

		this.service = instance;
	}

	handleSuccess = (response) => response;

	handleError = (error) => {
		const status = error?.response?.status;

		if (error?.response?.data?.message === 'Please login to continue') {
			localStorage.clear();
			sessionStorage.clear();
			window.location.href = '/login';
		}

		if (status === 401) {
			localStorage.clear();
			sessionStorage.clear();
			let nextPath = window.location.href;
			window.location.href = `/login?next=${nextPath}`;
			showToast(
				'Your session has timed out! Log in again to continue from where you stopped.',
				'info'
			);
		}
		return Promise.reject(error?.response?.data);
	};

	request(
		method,
		path,
		callback,
		errorCallback,
		payload,
		exectuteWhileLoading
	) {
		if (exectuteWhileLoading) exectuteWhileLoading();
		const requestMethod = method.toLowerCase();

		if (requestMethod === 'get' || requestMethod === 'options') {
			return this.service
				.request({
					method,
					url: path,
					responseType: 'json',
				})
				.then((response) => callback(response), errorCallback);
		} else {
			return this.service
				.request({
					method,
					url: path,
					responseType: 'json',
					data: payload,
				})
				.then((response) => callback(response?.data), errorCallback);
		}
	}
}

export default new ApiService();
