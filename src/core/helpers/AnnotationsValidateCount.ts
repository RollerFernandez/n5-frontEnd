import { PDFDocument, PDFName } from 'pdf-lib';
import type { PDFArray, PDFDict } from 'pdf-lib';

async function hasMultiplePopupAnnotations(originalFile: Blob): Promise<boolean> {
	const pdfData: any = await originalFile.arrayBuffer();
	const pdfDoc: any = await PDFDocument.load(pdfData);

	let popupCount: number = 0;

	const pages = pdfDoc.getPages();
	pages?.forEach((page: { node: { dict: PDFDict } }) => {
		const dictionary: PDFDict = page.node?.dict;
		const annotsRef: PDFArray | undefined = dictionary?.get(PDFName.of('Annots')) as PDFArray;

		if (annotsRef === undefined) return;

		const annotsArr = pdfDoc.context.lookup(annotsRef) as PDFArray;
		for (let i = 0; i < annotsArr.size(); i++) {
			const annotRef: any = annotsArr.get(i);
			const annotDict: any = pdfDoc.context.lookup(annotRef) as PDFDict;
			const subtype: any = annotDict.get(PDFName.of('Subtype'));

			if (subtype.encodedName === '/Popup') {
				popupCount++;
			}
		}
	});

	return popupCount > 0;
}

export default hasMultiplePopupAnnotations;
