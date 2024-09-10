const obtenerIniciales = (cadena: string): string =>
	cadena
		.split(' ')
		.map(nombre => nombre.charAt(0) ?? '')
		.slice(0)
		.join('');
export { obtenerIniciales };
