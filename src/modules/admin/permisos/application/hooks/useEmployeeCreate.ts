import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { EMPLOYEE_PAGINATED_SEARCH } from './QueryKeys';
import EmployeeResponse from '../../domain/EmployeeResponse';
import EmployeeRequest from '../../domain/EmployeeRequest';
import { employeeRepository } from '../../infrastructure';

const useEmployeeCreate = (): UseMutationResult<EmployeeResponse, Error, EmployeeRequest> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (employee: EmployeeRequest) => await employeeRepository.create(employee),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [EMPLOYEE_PAGINATED_SEARCH] });
		},
	});

	return response;
};

export default useEmployeeCreate;
