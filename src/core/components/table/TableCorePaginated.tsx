import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from 'react-bootstrap/Table';
import { type FilterPage, type PaginationResponse } from '@/modules/shared/domain';
import PaginationLinks from './PaginationLinks';

interface TableCorePaginatedProps<T> {
	columns: Array<ColumnDef<T, any>>;
	data: PaginationResponse<T>;
	goToPage: (payload: FilterPage) => void;
}

const TableCorePaginated = <T,>({
	columns,
	data,
	goToPage,
}: TableCorePaginatedProps<T>): JSX.Element => {
	const table = useReactTable<T>({
		columns,
		data: data?.items ?? [],
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
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
			</Table>
			{data?.items?.length > 0 && <PaginationLinks data={data} goToPage={goToPage} />}
		</>
	);
};

export default TableCorePaginated;
