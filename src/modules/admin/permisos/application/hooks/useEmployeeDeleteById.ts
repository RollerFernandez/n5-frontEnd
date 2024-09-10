import { type UseMutationResult, useQueryClient, useMutation } from '@tanstack/react-query';
import { EMPLOYEE_PAGINATED_SEARCH } from './QueryKeys';
import EmployeeResponse from '../../domain/EmployeeResponse';
import { employeeRepository } from '../../infrastructure';

const useEmployeeDeleteById = (): UseMutationResult<EmployeeResponse, Error> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (data: any) => await employeeRepository.deleteById(data),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [EMPLOYEE_PAGINATED_SEARCH] });
		},
	});

	return response;
};

export default useEmployeeDeleteById;
