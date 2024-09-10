import type TramiteSmall from './TramiteSmall';

export default interface SubTramiteSmall {
	id: number;
	idTramite: number;
	subtramite: string;
	tramite: TramiteSmall;
}
