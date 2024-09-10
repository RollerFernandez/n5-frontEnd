import type SubTramiteSmallMap from './SubTramiteSmallMap';

export default interface SubTramiteRequisitoMediumMap {
	id: number;
	idSubTramite: number;
	requisito: string;
	estado: boolean;
	subTramite: SubTramiteSmallMap;
}
