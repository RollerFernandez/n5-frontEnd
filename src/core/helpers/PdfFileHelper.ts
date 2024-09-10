import JsPDF from 'jspdf';
import autoTable, { type RowInput } from 'jspdf-autotable';
import { getBase64ImageFromURL } from '@/core/helpers/FileHelper';
import Logo from '@/layouts/views/styles/vendor/images/logo.png';
import { dateFormatterToString } from './DayjsHelper';

interface PdfBaseProps {
	columns: string[];
	body: RowInput[];
	title: string;
	fileName?: string;
	orientation?: 'p' | 'portrait' | 'l' | 'landscape';
}

export const createPdf = async ({
	columns,
	body,
	title,
	fileName,
	orientation,
}: PdfBaseProps): Promise<void> => {
	const doc = new JsPDF({
		orientation,
	});
	const logo = new Image();
	logo.src = await getBase64ImageFromURL(Logo);
	doc.addImage(logo, 'PNG', 15, 12, 48, 15);

	doc.text(title, 80, 22);

	autoTable(doc, {
		startY: 30,
		head: [columns],
		body,
	});

	const dateTimeFormatted = 'DD_MM_YYYY__HH_mm_ss';
	const dateTimeStrig = dateFormatterToString(new Date(), dateTimeFormatted);

	if (fileName == null || fileName?.trim().length <= 0) fileName = title;

	const fileNameFormatted = `${fileName}-${dateTimeStrig}.pdf`.replace(/ /g, '-');

	doc.save(fileNameFormatted);
};
