import dayjs from 'dayjs';

export const STATUS_CODE_NOT_FOUND = 404;
export const STATUS_CODE_NOT_FOUND_MESSAGE_WARNING =
	'La contraseña que ingreso no es correcta: Intento Nr 2';
export const STATUS_CODE_NOT_FOUND_MESSAGE_ERROR = 'Su cuenta ha sido bloqueado por intentos';
export const STATUS_CODE_NOT_FOUND_INCORRECT_PASSWORD =
	'La contraseña que ingreso no es correcta: Intento Nr 1';
export const PAGE_START_DEFAULT = 1;
export const PAGE_SIZE_DEFAULT = 10;
export const FILTER_PAGE_DEFAUT = {
	pageNumber: 1,
	pageSize: PAGE_SIZE_DEFAULT,
};
export const RESPONSE_PAGINATION_DEFAUT = {
	from: 0,
	to: 0,
	perPage: 0,
	currentPage: 0,
	lastPage: 0,
	total: 0,
	data: [],
};
export const SUBMIT_DEBOUNCE_DELAY = 100;
export const CHANGE_DEBOUNCE_DELAY = 100;
export const STATUS_NO_AVAILABLE = 'INACTIVO';
export const STATUS_AVAILABLE = 'ACTIVO';
export const ESTADO_HABILITAR = 'habilitar';
export const ESTADO_DESHABILITAR = 'deshabilitar';
export const DETAIL_REPORT_EXPEDIENTE = 1;
export const START_DATE_DEFAULT = dayjs().startOf('month').toDate();
export const END_DATE_DEFAULT = dayjs().endOf('month').toDate();
export const STATUS_DEFAUT = {
	ACTIVE: 'A',
	INACTIVE: 'I',
};
