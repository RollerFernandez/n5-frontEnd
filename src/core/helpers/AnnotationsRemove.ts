// import { PDFDocument, PDFName } from 'pdf-lib';

// async function removeAnnotationsFromFile(originalFile) {
// 	const pdfData = await originalFile.arrayBuffer();
// 	const pdfDoc = await PDFDocument.load(pdfData);

// 	const pages = pdfDoc.getPages();
// 	pages.forEach(page => {
// 		const dictionary = page.node.dict;
// 		const annotsRef = dictionary.get(PDFName.of('Annots'));
// 		if (!annotsRef) return;

// 		const annotsArr = pdfDoc.context.lookup(annotsRef);
// 		for (let i = annotsArr.size() - 1; i >= 0; i--) {
// 			const annotRef = annotsArr.get(i);
// 			const annotDict = pdfDoc.context.lookup(annotRef);
// 			const subtype = annotDict.get(PDFName.of('Subtype'));

// 			if (subtype && subtype.encodedName === '/Widget') {
// 				continue;
// 			}
// 			annotsArr.remove(i);
// 		}
// 	});

// 	const modifiedPdfData = await pdfDoc.save();
// 	const modifiedPdfBlob = new Blob([modifiedPdfData], { type: 'application/pdf' });
// 	return modifiedPdfBlob;
// }

// export default removeAnnotationsFromFile;

import { PDFDocument, PDFName } from 'pdf-lib';
import type { PDFArray, PDFDict } from 'pdf-lib';

async function removeAnnotationsFromFile(originalFile: Blob): Promise<File> {
	const pdfData: any = await originalFile.arrayBuffer();
	const pdfDoc: any = await PDFDocument.load(pdfData);

	const pages = pdfDoc.getPages();
	pages?.forEach((page: { node: { dict: PDFDict } }) => {
		const dictionary: PDFDict = page.node?.dict;
		const annotsRef: PDFArray | undefined = dictionary?.get(PDFName.of('Annots')) as PDFArray;

		if (annotsRef === undefined) return;

		const annotsArr = pdfDoc.context.lookup(annotsRef) as PDFArray;
		for (let i = annotsArr.size() - 1; i >= 0; i--) {
			const annotRef: any = annotsArr.get(i);
			const annotDict: any = pdfDoc.context.lookup(annotRef) as PDFDict;
			const subtype: any = annotDict.get(PDFName.of('Subtype'));

			if (subtype.encodedName === '/Widget') {
				continue;
			}
			annotsArr.remove(i);
		}
	});

	const modifiedPdfData = await pdfDoc.save();

	const modifiedPdfFile = new File([modifiedPdfData], 'modified.pdf', { type: 'application/pdf' });
	return modifiedPdfFile;
}
export default removeAnnotationsFromFile;
