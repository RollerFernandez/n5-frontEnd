export default interface MailResponse {
	id: number;
	email: string;
	clave: string;
	claveSalt: string;
	correoValido: boolean;
	fechaExpiracionToken: Date;
	fechaCaducidad: Date;
	tokenId: string;
	intentos: number;
	claveTem: string;
	fechaAlta: Date;
	fechaBaja: Date;
	fechaRegistro: Date;
	estado: boolean;
}
