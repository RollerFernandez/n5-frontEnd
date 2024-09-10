import { type UsuarioPersonaLoginResponseMap } from '.';
import type SecurityResponseMap from './SecurityResponseMap';

export default interface UserSecurityResponseMap {
	id: number;
	email: string;
	fechaAlta: string;
	fechaBaja: string;
	fechaRegistro: string;
	estado: boolean;
	security: SecurityResponseMap;
	persona: UsuarioPersonaLoginResponseMap;
}
