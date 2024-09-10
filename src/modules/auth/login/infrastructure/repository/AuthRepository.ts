import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constants/env';
import { dateStringToDate } from '@/core/helpers/DayjsHelper';
import type {
	LoginRequestMap,
	UserSecurityResponseMap,
	SecurityResponseMap,
	MailRequestMap,
	MailResponseMap,
	IpResponseMap,
} from '../model';
import type {
	LoginRequest,
	MailRequest,
	MailResponse,
	UserSecurityResponse,
} from '@/modules/auth/login/domain';

export const login = async (login: LoginRequest): Promise<UserSecurityResponse> => {
	const loginRequestMap: LoginRequestMap = {
		email: login.email,
		clave: login.clave,
	};

	const response: AxiosResponse<UserSecurityResponseMap> = await axios.post(
		`${API_BASE_URL}/api/autenticacion/login`,
		loginRequestMap,
	);

	const userSecurityResponseMap: UserSecurityResponseMap = response.data;
	const securityMap: SecurityResponseMap = userSecurityResponseMap.security;

	const userSecurity: UserSecurityResponse = {
		id: userSecurityResponseMap.id,
		email: userSecurityResponseMap.email,
		fechaAlta: dateStringToDate(userSecurityResponseMap.fechaAlta),
		fechaBaja: dateStringToDate(userSecurityResponseMap.fechaBaja),
		fechaRegistro: dateStringToDate(userSecurityResponseMap.fechaRegistro),
		estado: userSecurityResponseMap.estado,
		security: {
			accesToken: securityMap.accesTocken,
			expireOn: securityMap.expireOn,
			tokenType: securityMap.tokenType,
		},
		persona: userSecurityResponseMap.persona,
	};

	return userSecurity;
};

export const sendMail = async (mail: MailRequest): Promise<MailResponse> => {
	const mailRequestMap: MailRequestMap = {
		email: mail.email,
	};

	const response: AxiosResponse<MailResponseMap> = await axios.post(
		`${API_BASE_URL}/api/mail`,
		mailRequestMap,
	);

	const mailResponseMap: MailResponseMap = response.data;

	const mailResponse: MailResponse = {
		id: mailResponseMap.id,
		email: mailResponseMap.email,
		clave: mailResponseMap.clave,
		claveSalt: mailResponseMap.claveSalt,
		correoValido: mailResponseMap.correoValido,
		fechaExpiracionToken: dateStringToDate(mailResponseMap.fechaExpiracionToken),
		fechaCaducidad: dateStringToDate(mailResponseMap.fechaCaducidad),
		tokenId: mailResponseMap.tokenId,
		intentos: mailResponseMap.intentos,
		claveTem: mailResponseMap.claveTem,
		fechaAlta: dateStringToDate(mailResponseMap.fechaAlta),
		fechaBaja: dateStringToDate(mailResponseMap.fechaBaja),
		fechaRegistro: dateStringToDate(mailResponseMap.fechaRegistro),
		estado: mailResponseMap.estado,
	};

	return mailResponse;
};

export const getIp = async (): Promise<IpResponseMap> => {
	// const response: AxiosResponse<IpResponseMap> = await axios.get(`http://ip-api.com/json/`);
	const ipLocal = {
		as: 'AS269981 COMPUNETWORK S.A.C.',
		city: 'San Juan de Lurigancho',
		country: 'Peru',
		countryCode: 'PE',
		isp: 'Compunetwork S.A.C.',
		lat: -122.0022,
		lon: -72.01392,
		org: 'Compunetwork S.A.C',
		query: '321.211.223.81',
		region: 'LIM',
		regionName: 'Lima region',
		status: 'success',
		timezone: 'America/Lima',
		zip: '',
		ip: '321.211.223.81',
	};
	// console.log('response', response.data);
	return ipLocal;
};
