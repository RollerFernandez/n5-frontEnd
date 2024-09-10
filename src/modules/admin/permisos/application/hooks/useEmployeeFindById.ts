import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { EMPLOYEE_FIND_BY_ID } from './QueryKeys';
import EmployeeResponse from '../../domain/EmployeeResponse';
import { employeeRepository } from '../../infrastructure';

const useEmployeeFindById = (id?: number): UseQueryResult<EmployeeResponse, Error> => {
	const response = useQuery({
		queryKey: [EMPLOYEE_FIND_BY_ID, id],
		queryFn: async () => await employeeRepository.findById(Number(id)),
		enabled: !(id == null),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useEmployeeFindById;
