import { type MenuPerfilSidebarResponse } from '@/layouts/domain';
import { type UserSecurityResponse } from '@/modules/auth/login/domain';
// import { type IpResponseMap } from '@/modules/auth/login/infrastructure/model';
import CryptoJS from 'crypto-js';
import { KEY_LOCAL_STORAGE } from '../constants/env';
import { type IpResponseMap } from '@/modules/auth/login/infrastructure/model';

const STORAGE_OF_AUTHORIZATION = 'STORAGE_OF_AUTHORIZATION_APP';
// const STORAGE_OF_PERFIL = 'STORAGE_OF_PERFIL';
const STORAGE_OF_IP = 'STORAGE_OF_IP';
const STORAGE_OF_MENU = 'STORAGE_OF_MENU';
const SECRET_KEY = KEY_LOCAL_STORAGE;

export const saveAuthorization = (payload: UserSecurityResponse): void => {
	const encryptedPayload = CryptoJS.AES.encrypt(JSON.stringify(payload), SECRET_KEY).toString();
	localStorage.setItem(STORAGE_OF_AUTHORIZATION, encryptedPayload);
};

export const getAuthorization = (): UserSecurityResponse | null => {
	const encryptedData = localStorage.getItem(STORAGE_OF_AUTHORIZATION);
	if (encryptedData === null || encryptedData === undefined || encryptedData === '') {
		return null;
	}

	const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
	const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
	try {
		return JSON.parse(decryptedData);
	} catch (error) {
		console.error('Decrypted data is not valid JSON', error);
		return null;
	}
};

export const removeAuthorization = (): void => {
	localStorage.removeItem(STORAGE_OF_AUTHORIZATION);
};

export const existsAuthorization = (): boolean => {
	const data = localStorage.getItem(STORAGE_OF_AUTHORIZATION);

	if (data != null) return true;

	return false;
};

export const isValidAuthorization = (): boolean => {
	const encryptedData = localStorage.getItem(STORAGE_OF_AUTHORIZATION);

	if (encryptedData == null) return false;

	const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
	const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

	let user: UserSecurityResponse;
	try {
		user = JSON.parse(decryptedData);
	} catch (error) {
		console.error('Decrypted data is not valid JSON', error);
		return false;
	}

	if (user.security?.expireOn.length === 0) return false;

	const expireOn = new Date(user.security.expireOn);
	const currentDate = new Date();

	return expireOn > currentDate;
};

// export const savePerfil = (payload: UsuarioPerfilResponse | undefined): void => {
// 	localStorage.setItem(STORAGE_OF_PERFIL, JSON.stringify(payload));
// };

// export const removePerfil = (): void => {
// 	localStorage.removeItem(STORAGE_OF_PERFIL);
// };

// export const getPerfil = (): UserSecurityResponse => {
// 	const data = localStorage.getItem(STORAGE_OF_PERFIL);

// 	if (data == null) throw new Error('Required Login');

// 	return JSON.parse(data);
// };

export const saveMenuCargo = (payload: MenuPerfilSidebarResponse[]): void => {
	localStorage.setItem(STORAGE_OF_MENU, JSON.stringify(payload));
};

export const removeMenuCargo = (): void => {
	localStorage.removeItem(STORAGE_OF_MENU);
};

export const getMenuCargo = (): MenuPerfilSidebarResponse[] => {
	const data = localStorage.getItem(STORAGE_OF_MENU);

	return JSON.parse(data + '');
};

export const saveIp = (payload: IpResponseMap): void => {
	localStorage.setItem(STORAGE_OF_IP, JSON.stringify(payload));
};

export const removeIp = (): void => {
	localStorage.removeItem(STORAGE_OF_IP);
};

export const getIp = (): IpResponseMap => {
	const data = localStorage.getItem(STORAGE_OF_IP);

	if (data == null) throw new Error('Required Login');

	return JSON.parse(data);
};
