import { useEffect, useState, type JSX } from 'react';
import FormSelect from 'react-bootstrap/FormSelect';
import Pagination from 'react-bootstrap/Pagination';
import { type FilterPage, type PaginationResponse } from '@/modules/shared/domain';
import PaginationItems from './PaginationItems';

interface PaginationLinksProps<T> {
	data: PaginationResponse<T>;
	goToPage: (payload: FilterPage) => void;
}

const PaginationLinks = <T,>({ data, goToPage }: PaginationLinksProps<T>): JSX.Element => {
	const perPageItems: number[] = [5, 10, 20, 30, 40, 50, 100];
	const paginationItemsLimit: number = 5;
	const [pageSize, setPageSize] = useState<number>(0);
	const [pageOptions, setPageOptions] = useState<number[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);

	const [paginationItems, setPaginationItems] = useState<number[]>([]);
	const [isPosibleShowAll, setIsPosibleShowAll] = useState<boolean>(true);
	const [separatorAtEnd, setSeparatorAtEnd] = useState<boolean>(false);
	const [separatorAtAround, setSeparatorAtAround] = useState<boolean>(false);

	// Hooks
	useEffect(() => {
		setPaginationItems(Array.from({ length: paginationItemsLimit }, (_, i) => i));
	}, []);

	useEffect(() => {
		if (data != null) {
			setCurrentPage(data.currentPage);
			setPageSize(data.pageSize);
			setPageOptions(Array.from({ length: data.lastPage }, (_, i) => i));

			// setSeparatorAtEnd
			setSeparatorAtEnd(data.currentPage < paginationItemsLimit);

			// setSeparatorAtAround
			const showSeparatorAtAround =
				data.currentPage >= paginationItemsLimit &&
				data.lastPage > paginationItemsLimit &&
				data.lastPage > data.currentPage + 1;

			setSeparatorAtAround(showSeparatorAtAround);
		}
	}, [data]);

	useEffect(() => {
		if (data?.lastPage != null) setIsPosibleShowAll(data?.lastPage <= paginationItemsLimit);
	}, [data?.lastPage]);

	return (
		<div className="d-flex justify-content-between align-items-center flex-wrap">
			<div className="d-flex justify-content-between align-items-center py-1">
				<div className="pe-2">
					Mostrando del
					<span className="fw-bold"> {data?.from ?? 0}</span> al
					<span className="fw-bold"> {data?.totalPages ?? 0}</span> de un total de
					<span className="fw-bold"> {data?.totalCount ?? 0}</span> registros
				</div>
				<FormSelect
					size="sm"
					className="w-auto"
					value={pageSize}
					onChange={e => {
						const pageSize = Number(e.target.value);
						setPageSize(pageSize);
						goToPage({ pageNumber: 1, pageSize });
					}}
				>
					{perPageItems.map(pageSizeItem => (
						<option key={pageSizeItem} value={pageSizeItem}>
							{pageSizeItem}
						</option>
					))}
				</FormSelect>
			</div>
			<Pagination size="sm" className="mb-0">
				<Pagination.First
					disabled={data?.currentPage === 1}
					onClick={() => {
						goToPage({
							pageNumber: 1,
							pageSize: data?.pageSize ?? 10,
						});
					}}
				/>
				<Pagination.Prev
					disabled={data?.currentPage === 1}
					onClick={() => {
						goToPage({
							pageNumber: (data?.currentPage ?? 0) - 1,
							pageSize: data?.pageSize ?? 10,
						});
					}}
				/>

				<PaginationItems
					data={data}
					goToPage={goToPage}
					paginationItemsLimit={paginationItemsLimit}
					paginationItems={paginationItems}
					pageOptions={pageOptions}
					pageSize={pageSize}
					currentPage={currentPage}
					isPosibleShowAll={isPosibleShowAll}
					separatorAtEnd={separatorAtEnd}
					separatorAtAround={separatorAtAround}
				/>

				<Pagination.Next
					disabled={data?.currentPage === data?.lastPage}
					onClick={() => {
						goToPage({
							pageNumber: (data?.currentPage ?? 0) + 1,
							pageSize: data?.pageSize ?? 10,
						});
					}}
				/>
				<Pagination.Last
					disabled={data?.currentPage === data?.lastPage}
					onClick={() => {
						goToPage({
							pageNumber: data?.lastPage ?? 0,
							pageSize: data?.pageSize ?? 10,
						});
					}}
				/>
			</Pagination>
		</div>
	);
};

export default PaginationLinks;
