import type SecurityResponse from './SecurityResponse';
import type UsuarioPersonaLoginResponse from './UsuarioPersonaLoginResponse';

export default interface UserSecurityResponse {
	id: number;
	email: string;
	fechaAlta: Date;
	fechaBaja: Date;
	fechaRegistro: Date;
	estado: boolean;
	security: SecurityResponse;
	persona: UsuarioPersonaLoginResponse;
}
