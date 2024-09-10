import { type RecordState } from '@/modules/shared/domain';
import {
	ESTADO_DESHABILITAR,
	ESTADO_HABILITAR,
	STATUS_AVAILABLE,
	STATUS_NO_AVAILABLE,
} from '../constants';

export const RECORD_STATE_ACTIVE = {
	value: 'A',
	label: STATUS_AVAILABLE,
	color: 'success-ligth',
};
export const RECORD_STATE_INACTIVE = {
	value: 'I',
	label: STATUS_NO_AVAILABLE,
	color: 'danger-ligth',
};
export const RECORD_STATUS = [RECORD_STATE_ACTIVE, RECORD_STATE_INACTIVE];

export const getRecordState = (value: string): RecordState => {
	return RECORD_STATUS.find(status => status.value === value) ?? RECORD_STATE_INACTIVE;
};

export const getRecordStateAction = (value: boolean): string => {
	return value ? ESTADO_HABILITAR : ESTADO_DESHABILITAR;
};
