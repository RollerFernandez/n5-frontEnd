import dayjs from 'dayjs';
import es from 'dayjs/locale/es';
export const API_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const API_DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT = 'DD-MM-YYYY';
export const FECHA_DESCRITA = 'D [de] MMMM [del] YYYY';
export const API_DATE_TIME_FORMAT_A = 'YYYY-MM-DD HH:mm';
export const OUTPUT_DATE_FORMAT = 'DD/MM/YYYY h:mm a';
export const OUPUT_DATE_DEFAULT_FORMATO = 'YYYY-MM-DDTHH:mm:ss';

const dateStringIsValid = (dateString: string, format = API_DATE_TIME_FORMAT): boolean =>
	dayjs(dateString, format, true).isValid();

const validateDate = (
	date: Date | string | null | undefined,
	format = API_DATE_TIME_FORMAT,
): Date | null => {
	if (date === undefined || date === null || date === '') {
		return null;
	} else {
		if (typeof date === 'string') {
			// Verificar si el string de fecha es válido
			if (dateStringIsValid(date, format)) {
				// Si es válido, devolver la fecha como un objeto Date
				return new Date(date);
			} else {
				// Si no es válido, devolver null
				return null;
			}
		} else if (date instanceof Date) {
			// Si la entrada es un objeto Date, devolverlo tal cual
			return new Date(date);
		} else {
			// Si la entrada no es válida, imprimir un error y devolver null
			console.error('Formato de fecha no reconocido:', date);
			return null;
		}
	}
};
const dateStrignFormatter = (
	dateString: string,
	format = API_DATE_TIME_FORMAT,
	outFormat = DATE_FORMAT,
): string => dayjs(dateString, format, true).format(outFormat);

const dateStrignFormatterReverse = (
	dateString: string,
	format = API_DATE_TIME_FORMAT,
	outFormat = API_DATE_FORMAT,
): string => dayjs(dateString, format, true).format(outFormat);

const dateStrignFormatterDefault = (
	dateString: string,
	format = API_DATE_FORMAT,
	outFormat = OUPUT_DATE_DEFAULT_FORMATO,
): string => dayjs(dateString, format, true).format(outFormat);

// Para formatear con hora
const dateStrignFormatterHora = (
	dateString: string,
	inputFormat = API_DATE_TIME_FORMAT_A,
	outputFormat = OUTPUT_DATE_FORMAT,
): string => dayjs(dateString, inputFormat).format(outputFormat);

const dateStringToDate = (dateString: string, format = API_DATE_TIME_FORMAT): Date =>
	dayjs(dateString, format, true).toDate();

const dateFormatterToString = (date: Date, outFormat = DATE_FORMAT): string =>
	dayjs(date).format(outFormat);

const dateDescritaFormatterToString = (
	fecha: Date | string | null | undefined,
	outFormat = FECHA_DESCRITA,
): string => {
	const date = validateDate(fecha);
	if (date === undefined || date === null) {
		return '';
	} else {
		if (typeof date === 'string') {
			return dayjs(dateStringToDate(date)).locale(es).format(outFormat);
		} else if (date instanceof Date) {
			return dayjs(date).locale(es).format(outFormat);
		} else {
			console.error(date);
			return '';
		}
	}
};
const fechaStringDescritoFormatter = (date: string, outFormat = FECHA_DESCRITA): string =>
	dayjs(date, outFormat, true).locale(es).format(outFormat);

const dateFormatterToStringOrEmpty = (date?: Date | null, outFormat = DATE_FORMAT): string => {
	if (date != null) return dayjs(date).format(outFormat);
	return '';
};

export {
	dateStrignFormatterDefault,
	dateStringIsValid,
	dateStrignFormatter,
	dateStringToDate,
	dateFormatterToString,
	dateDescritaFormatterToString,
	dateFormatterToStringOrEmpty,
	dateStrignFormatterHora,
	fechaStringDescritoFormatter,
	dateStrignFormatterReverse,
	validateDate,
};
