import axios, { type InternalAxiosRequestConfig } from 'axios';
import { LocalStorageSession } from '@/core/sessions';
import { type UserSecurityResponse } from '@/modules/auth/login/domain';

const AxiosInterceptor = (): void => {
	// Add a request interceptor
	axios.interceptors.request.use(
		async (value: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
			const config: InternalAxiosRequestConfig = { ...value };

			config.headers.Accept = 'application/json';
			if (config.data instanceof FormData) {
				config.headers['Content-Type'] = 'multipart/form-data';
			} else {
				config.headers['Content-Type'] = 'application/json';
			}

			const isValidAuth = LocalStorageSession.isValidAuthorization();

			// console.log('Interceptor', isValidAuth);

			if (isValidAuth) {
				const user: UserSecurityResponse | null = LocalStorageSession.getAuthorization();
				const security = user?.security;

				config.headers.Authorization = `${security?.tokenType} ${security?.accesToken}`;
			}

			return config;
		},
		async error => await Promise.reject(error),
	);

	// Add a response interceptor
	axios.interceptors.response.use(
		response => response,
		async error => await Promise.reject(error),
	);
};

export default AxiosInterceptor;
