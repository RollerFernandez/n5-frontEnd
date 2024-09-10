import { type JSX, useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { type FilterPage, type PaginationResponse } from '@/modules/shared/domain';

interface PaginationLinksProps<T> {
	data: PaginationResponse<T>;
	goToPage: (payload: FilterPage) => void;
	paginationItemsLimit: number;
	pageSize: number;
	pageOptions: number[];
	currentPage: number;
	paginationItems: number[];
	isPosibleShowAll: boolean;
	separatorAtEnd: boolean;
	separatorAtAround: boolean;
}

const PaginationItems = <T,>({
	data,
	goToPage,
	currentPage,
	paginationItemsLimit,
	pageSize,
	pageOptions,
	paginationItems,
	isPosibleShowAll,
	separatorAtEnd,
	separatorAtAround,
}: PaginationLinksProps<T>): JSX.Element => {
	// Attributes
	const [itemContent, setItemContent] = useState<JSX.Element>(<></>);

	// Hooks
	useEffect(() => {
		// console.log('PaginationItems:useEffect');

		let content: JSX.Element;
		if (isPosibleShowAll) {
			content = (
				<>
					{pageOptions.map(pageNumber => (
						<Pagination.Item
							key={pageNumber}
							active={isCurrentPage(pageNumber + 1)}
							onClick={() => {
								goToPage({ pageNumber: pageNumber + 1, pageSize: pageSize });
							}}
						>
							{pageNumber + 1}
						</Pagination.Item>
					))}
				</>
			);
		} else if (separatorAtEnd) {
			content = (
				<>
					{paginationItems.map(pageNumber => (
						<Pagination.Item
							key={pageNumber}
							active={isCurrentPage(pageNumber + 1)}
							onClick={() => {
								goToPage({ pageNumber: pageNumber + 1, pageSize: pageSize });
							}}
						>
							{pageNumber + 1}
						</Pagination.Item>
					))}

					<Pagination.Ellipsis disabled />
					<Pagination.Item
						active={isCurrentPage(data?.lastPage)}
						onClick={() => {
							goToPage({ pageNumber: data?.lastPage ?? 0, pageSize: pageSize });
						}}
					>
						{data?.lastPage ?? 0}
					</Pagination.Item>
				</>
			);
		} else if (separatorAtAround) {
			content = (
				<>
					<Pagination.Item
						onClick={() => {
							goToPage({ pageNumber: 1, pageSize: pageSize });
						}}
					>
						1
					</Pagination.Item>
					<Pagination.Ellipsis disabled />

					<Pagination.Item
						active={isCurrentPage((data?.currentPage ?? 0) - 1)}
						onClick={() => {
							goToPage({ pageNumber: (data?.currentPage ?? 0) - 1, pageSize: pageSize });
						}}
					>
						{(data?.currentPage ?? 0) - 1}
					</Pagination.Item>
					<Pagination.Item
						active={isCurrentPage(data?.currentPage ?? 0)}
						onClick={() => {
							goToPage({ pageNumber: data?.currentPage ?? 0, pageSize: pageSize });
						}}
					>
						{data?.currentPage ?? 0}
					</Pagination.Item>
					<Pagination.Item
						active={isCurrentPage((data?.currentPage ?? 0) + 1)}
						onClick={() => {
							goToPage({ pageNumber: (data?.currentPage ?? 0) + 1, pageSize: pageSize });
						}}
					>
						{(data?.currentPage ?? 0) + 1}
					</Pagination.Item>

					<Pagination.Ellipsis disabled />
					<Pagination.Item
						active={isCurrentPage(data?.lastPage)}
						onClick={() => {
							goToPage({ pageNumber: data?.lastPage ?? 0, pageSize: pageSize });
						}}
					>
						{data?.lastPage ?? 0}
					</Pagination.Item>
				</>
			);
		} else {
			content = (
				<>
					<Pagination.Item
						active={isCurrentPage(1)}
						onClick={() => {
							goToPage({ pageNumber: 1, pageSize: pageSize });
						}}
					>
						1
					</Pagination.Item>
					<Pagination.Ellipsis disabled />

					{paginationItems.map(pageNumber => {
						const current = (data?.lastPage ?? 0) - (paginationItemsLimit - pageNumber) + 1;

						return (
							<Pagination.Item
								key={pageNumber}
								active={isCurrentPage(current)}
								onClick={() => {
									goToPage({ pageNumber: current, pageSize: pageSize });
								}}
							>
								{current}
							</Pagination.Item>
						);
					})}
				</>
			);
		}
		setItemContent(content);
	}, [isPosibleShowAll, separatorAtEnd, separatorAtAround]);

	// Methods
	const isCurrentPage = (current: number | undefined): boolean => current === currentPage;

	return <>{itemContent}</>;
};

export default PaginationItems;
