import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constants/env';
import {
	type TramiteSmall,
	type SubTramiteRequisitoMedium,
	type SubTramiteSmall,
} from '../../domain';
import {
	type TramiteSmallMap,
	type SubTramiteRequisitoMediumMap,
	type SubTramiteSmallMap,
} from '../model';

const mapTramiteSmall = (item: TramiteSmallMap): TramiteSmall => ({
	id: item.id,
	nombre: item.nombre,
	tramiteSanipes: item.tramiteSanipes,
});

const mapSubTramiteSmall = (item: SubTramiteSmallMap): SubTramiteSmall => ({
	id: item.id,
	idTramite: item.idTramite,
	subtramite: item.subtramite,
	tramite: mapTramiteSmall(item.tramite),
});

const mapSubTramiteRequisitoMedium = (
	item: SubTramiteRequisitoMediumMap,
): SubTramiteRequisitoMedium => ({
	id: item.id,
	idSubTramite: item.idSubTramite,
	requisito: item.requisito,
	estado: item.estado,
	subTramite: mapSubTramiteSmall(item.subTramite),
});

export const findAllByIdExpediente = async (
	idExpediente: number,
): Promise<SubTramiteRequisitoMedium[]> => {
	console.log(idExpediente);

	const response: AxiosResponse<SubTramiteRequisitoMediumMap[]> = await axios.get(
		`${API_BASE_URL}/api/subtramiterequisito/findallbyidexpediente/${idExpediente}`,
	);

	const subTramiteRequisitos: SubTramiteRequisitoMedium[] = response.data.map(item => {
		return mapSubTramiteRequisitoMedium(item);
	});

	return subTramiteRequisitos;
};
