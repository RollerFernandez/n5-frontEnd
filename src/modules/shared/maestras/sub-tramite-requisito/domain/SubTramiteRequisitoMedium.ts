import type SubTramiteSmall from './SubTramiteSmall';

export default interface SubTramiteRequisitoMedium {
	id: number;
	idSubTramite: number;
	requisito: string;
	estado: boolean;
	subTramite: SubTramiteSmall;
}
