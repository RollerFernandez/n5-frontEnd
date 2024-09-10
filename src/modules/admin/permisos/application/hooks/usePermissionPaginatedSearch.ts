import type { PaginationRequest, PaginationResponse } from '@/modules/shared/domain';
import { type DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { EMPLOYEE_PAGINATED_SEARCH } from './QueryKeys';
import { employeeRepository } from '../../infrastructure';
import EmployeeFilter from '../../domain/EmployeeFilter';
import EmployeeResponse from '../../domain/EmployeeResponse';

const useEmployeePaginatedSearch = (
	paginationRequest: PaginationRequest<EmployeeFilter>,
): DefinedUseQueryResult<PaginationResponse<EmployeeResponse>, Error> => {
	const response = useQuery({
		queryKey: [EMPLOYEE_PAGINATED_SEARCH, paginationRequest],
		queryFn: async () => await employeeRepository.paginatedSearch(paginationRequest),
		retry: 0,
		refetchOnWindowFocus: false,
		initialData: {
			from: 0,
			to: 0,
			pageSize: 0,
			currentPage: 0,
			lastPage: 0,
			totalPages: 0,
			totalCount: 0,
			items: [],
		},
	});

	return response;
};

export default useEmployeePaginatedSearch;
