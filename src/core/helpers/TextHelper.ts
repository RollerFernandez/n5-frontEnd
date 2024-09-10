export const abreviarTexto = (texto: string): string => {
	if (texto !== '') {
		return texto.length > 100 ? texto.substring(0, 97) + '..' : texto;
	} else {
		return '';
	}
};

export const puenteStringToBoolean = (cadena: string, name: string): boolean => {
	let checked = false;
	if (cadena.length > 0) {
		const array = cadena.split(',');
		array.forEach(value => {
			if (value.trim() !== '' && value.trim().includes(name)) checked = true;
		});
	}

	return checked;
};

export const puenteObjectToString = (data: any): string => {
	let result: string = '';
	for (const key in data) {
		if (data[key] === true) result = result + key + ',';
	}
	return result;
};

interface GroupOfObjects {
	i1: string;
	i2: string;
	i3: string;
	c1: string;
	c2: string;
	c3: string;
	p1: string;
	p2: string;
	p3: string;
}
interface StringIsLast {
	data: string;
	l: boolean;
}
interface AnalisisIndividual {
	// ingrediente
	i: string;
	// cantidad
	c: string;
	// porcentaje
	p: string;
}
const analisisVacio: AnalisisIndividual = {
	i: '',
	c: '',
	p: '',
};
export const stringToArrayOfThree = (cadena: string): GroupOfObjects[] | [] => {
	if (cadena?.length > 0) {
		const lineas = cadena.trim().split('\n');
		const grupos: GroupOfObjects[] = [];

		for (let i = 0; i < lineas.length; i += 3) {
			const grupo: GroupOfObjects = {
				i1: separateStringToAnalisisIndividual(lineas[i]).i ?? '',
				i2: separateStringToAnalisisIndividual(lineas[i + 1]).i ?? '',
				i3: separateStringToAnalisisIndividual(lineas[i + 2]).i ?? '',
				c1: separateStringToAnalisisIndividual(lineas[i]).c ?? '',
				c2: separateStringToAnalisisIndividual(lineas[i + 1]).c ?? '',
				c3: separateStringToAnalisisIndividual(lineas[i + 2]).c ?? '',
				p1: separateStringToAnalisisIndividual(lineas[i]).p ?? '',
				p2: separateStringToAnalisisIndividual(lineas[i + 1]).p ?? '',
				p3: separateStringToAnalisisIndividual(lineas[i + 2]).p ?? '',
			};

			grupos.push(grupo);
		}

		return grupos;
	} else {
		return [];
	}
};
export const separateStringToAnalisisIndividual = (cadena: string): AnalisisIndividual => {
	if (cadena?.length > 0) {
		const propiedades = cadena.trim().split(',');
		const grupo: AnalisisIndividual = {
			i: propiedades[0] ?? '',
			c: propiedades[1] ?? '',
			p: propiedades[2] ?? '',
		};

		return grupo;
	} else {
		return analisisVacio;
	}
};
export const getStringMarkLastItemToArray = (cadena: string): StringIsLast[] => {
	if (cadena?.length > 0) {
		const lineas = cadena.trim().split('\n');
		const datos: StringIsLast[] = [];
		for (let i = 0; i < lineas.length; i++) {
			const dato: StringIsLast = {
				data: lineas[i],
				l: i + 1 !== lineas.length,
			};
			datos.push(dato);
			console.log(dato);
		}
		return datos;
	}
	return [];
};
