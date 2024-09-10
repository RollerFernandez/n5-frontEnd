export const convertBase64ToBlob = (
	b64Data: string,
	contentType: string,
	sliceSize = 512,
): Blob => {
	const byteCharacters: string = atob(b64Data);
	const byteArrays: Uint8Array[] = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice: string = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers: number[] = new Array(slice.length);
		for (let i = 0; i < slice.length; i += 1) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray: Uint8Array = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	const blob: Blob = new Blob(byteArrays, {
		type: contentType,
	});

	return blob;
};

export const convertFileToBase64 = async (file: Blob): Promise<string> =>
	await new Promise((resolve, reject) => {
		const fileReader: FileReader = new FileReader();

		fileReader.onloadend = () => {
			const resultString: string = fileReader.result as string;
			const base64String: string = resultString?.replace('data:', '')?.replace(/^.+,/, '');

			resolve(base64String);
		};
		fileReader.onerror = reject;
		// fileReader.readAsText(file);
		fileReader.readAsDataURL(file);
	});

export const getExtension = (file: string): string => {
	const regexp: RegExp = /\.([0-9a-z]+)(?:[\\?#]|$)/i;
	const extension: RegExpMatchArray | null = file.match(regexp);
	return extension?.[1] ?? '';
};

export const getBase64ImageFromURL = async (url: string): Promise<string> =>
	await new Promise((resolve, reject) => {
		const img = new Image();
		img.setAttribute('crossOrigin', 'anonymous');

		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;

			const ctx = canvas.getContext('2d');
			if (ctx != null) ctx.drawImage(img, 0, 0);

			const dataURL = canvas.toDataURL('image/png');

			resolve(dataURL);
		};

		img.onerror = error => {
			reject(error);
		};

		img.src = url;
	});

export const convertUrlToBlob = async (url: string): Promise<Blob> => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	const blob = await response.blob();
	return blob;
};

export async function convertBase64ToFile(
	base64String: string,
	fileName: string,
	mimeType: string = 'application/octet-stream',
): Promise<File> {
	const binaryString = atob(base64String);

	const arrayBuffer = new ArrayBuffer(binaryString.length);
	const uint8Array = new Uint8Array(arrayBuffer);
	for (let i = 0; i < binaryString.length; i++) {
		uint8Array[i] = binaryString.charCodeAt(i);
	}

	const blob = new Blob([uint8Array], { type: mimeType });

	const file = new File([blob], fileName, { type: mimeType });

	return file;
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
	const bin = window.atob(base64);
	const len = bin.length;
	const uInt8Array = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		uInt8Array[i] = bin.charCodeAt(i);
	}
	return uInt8Array.buffer;
}

// export function uuidv4(): string {
// 	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
// 		const r: number = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
// 		return v.toString(16);
// 	});
// }

export function uuidv4(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c: string): string {
		const r: number = (Math.random() * 16) | 0;
		const v: number = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
