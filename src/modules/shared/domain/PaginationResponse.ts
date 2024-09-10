export default interface PaginationResponse<T> {
	from: number;
	to: number;
	pageSize: number;
	currentPage: number;
	lastPage: number;
	totalPages: number;
	totalCount: number;
	items: T[];
}
