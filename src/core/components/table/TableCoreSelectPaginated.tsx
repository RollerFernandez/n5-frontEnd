import Table from 'react-bootstrap/Table';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	type RowSelectionState,
	type Updater,
} from '@tanstack/react-table';
import { type FilterPage, type PaginationResponse } from '@/modules/shared/domain';
import IndeterminateCheck from './IndeterminateCheck';
import { useState } from 'react';

interface TableCoreSelectPaginatedProps<T> {
	columns: Array<ColumnDef<T, any>>;
	data: PaginationResponse<T>;
	goToPage: (payload: FilterPage) => void;
	onRowSelection?: (payload: T[]) => void;
}

const TableCoreSelectPaginated = <T,>({
	columns,
	data,
	onRowSelection,
}: TableCoreSelectPaginatedProps<T>): JSX.Element => {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const table = useReactTable<T>({
		columns: [
			{
				id: 'select',
				header: ({ table: tbl }) => (
					<div className="text-center">
						{data?.items !== null && (
							<IndeterminateCheck
								{...{
									checked: tbl.getIsAllRowsSelected(),
									indeterminate: tbl.getIsSomeRowsSelected(),
									onChange: tbl.getToggleAllRowsSelectedHandler(),
								}}
							/>
						)}
					</div>
				),
				cell: ({ row }) => (
					<div className="text-center">
						<IndeterminateCheck
							{...{
								checked: row.getIsSelected(),
								indeterminate: row.getIsSomeSelected(),
								onChange: row.getToggleSelectedHandler(),
							}}
						/>
					</div>
				),
			},
			...columns,
		],
		data: data?.items ?? [],
		state: { rowSelection },
		onRowSelectionChange: (updaterOrValue: Updater<RowSelectionState>) => {
			setRowSelection(prev => {
				const next = typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue;

				const arrayIndex: number[] = Object.keys(next).map(d => parseInt(d));

				const rows = table.getPreFilteredRowModel().rows;

				const selectedRows = rows.filter(d => arrayIndex.includes(d.index)).map(d => d.original);

				onRowSelection?.(selectedRows);

				return next;
			});
		},
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<Table responsive bordered hover size="sm">
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} className="bg-primary-dark">
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

			{/* {data?.items?.length > 0 && <PaginationLinks data={data} goToPage={goToPage}
			/>} */}
		</>
	);
};

export default TableCoreSelectPaginated;
