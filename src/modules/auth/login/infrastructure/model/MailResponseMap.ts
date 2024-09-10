export default interface MailResponseMap {
	id: number;
	email: string;
	clave: string;
	claveSalt: string;
	correoValido: boolean;
	fechaExpiracionToken: string;
	fechaCaducidad: string;
	tokenId: string;
	intentos: number;
	claveTem: string;
	fechaAlta: string;
	fechaBaja: string;
	fechaRegistro: string;
	estado: boolean;
}
