import type TramiteSmallMap from './TramiteSmallMap';

export default interface SubTramiteSmallMap {
	id: number;
	idTramite: number;
	subtramite: string;
	tramite: TramiteSmallMap;
}
