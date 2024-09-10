import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from 'react-bootstrap/Table';

interface TableCoreProps<T> {
	columns: Array<ColumnDef<T, any>>;
	data: T[];
}

const TableCore = <T,>({ columns, data }: TableCoreProps<T>): JSX.Element => {
	const table = useReactTable<T>({
		columns,
		data: data ?? [],
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Table responsive bordered hover size="sm">
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th key={header.id} className="bg-primary-ligth">
								{header.isPlaceholder
									? null
									: flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map(row => (
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => (
							<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
						))}
					</tr>
				))}
			</tbody>
			{/* Se agrego footer para mostrar en las tablas FBPR, Region Origen, lote, Zona Cultivo  */}
			<tfoot>
				{table.getFooterGroups().map(footerGroup => (
					<tr key={footerGroup.id} className="border border-0">
						{footerGroup.headers.map(footer => (
							<th key={footer.id} className="border border-0">
								{flexRender(footer.column.columnDef.footer, footer.getContext())}
							</th>
						))}
					</tr>
				))}
			</tfoot>
		</Table>
	);
};

export default TableCore;
