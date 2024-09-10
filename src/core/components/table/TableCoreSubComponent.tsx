import { Fragment, type ReactElement } from 'react';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	type Row,
	useReactTable,
} from '@tanstack/react-table';
import Table from 'react-bootstrap/Table';
import { IconCore } from '../general';

export type { Row as RowTable };

interface TableCoreSubComponentProps<T> {
	columns: Array<ColumnDef<T, any>>;
	data: T[];
	renderSubComponent: (props: { row: Row<T> }) => ReactElement;
	getRowCanExpand: (row: Row<T>) => boolean;
}

const TableCoreSubComponent = <T,>({
	columns,
	data,
	renderSubComponent,
	getRowCanExpand,
}: TableCoreSubComponentProps<T>): JSX.Element => {
	const table = useReactTable<T>({
		data: data ?? [],
		columns: [
			{
				id: 'expander',
				header: () => null,
				cell: ({ row }) => {
					return row.getCanExpand() ? (
						<button
							className="btn btn-sm border-0 text-primary"
							{...{
								onClick: row.getToggleExpandedHandler(),
								style: { cursor: 'pointer' },
							}}
						>
							{row.getIsExpanded() ? (
								<IconCore icon="fa-solid fa-chevron-down" />
							) : (
								<IconCore icon="fa-solid fa-chevron-right" />
							)}
						</button>
					) : (
						'🔵'
					);
				},
			},
			...columns,
		],
		getRowCanExpand,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
	});

	return (
		<Table responsive bordered hover size="sm">
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => {
							return (
								<th key={header.id} colSpan={header.colSpan} className="bg-primary-ligth">
									{header.isPlaceholder ? null : (
										<div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
									)}
								</th>
							);
						})}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map(row => {
					return (
						<Fragment key={row.id}>
							<tr>
								{/* first row is a normal row */}
								{row.getVisibleCells().map(cell => {
									return (
										<td key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									);
								})}
							</tr>
							{row.getIsExpanded() && (
								<tr>
									{/* 2nd row is a custom 1 cell row */}
									<td colSpan={row.getVisibleCells().length}>{renderSubComponent({ row })}</td>
								</tr>
							)}
						</Fragment>
					);
				})}
			</tbody>
		</Table>
	);
};

export default TableCoreSubComponent;
