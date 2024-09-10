import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { EMPLOYEE_PAGINATED_SEARCH } from './QueryKeys';
import PermissionResponse from '../../domain/EmployeeResponse';
import EmployeeRequest from '../../domain/EmployeeRequest';
import { employeeRepository } from '../../infrastructure';

interface EmployeeUpdateProps {
	id: number;
	employee: EmployeeRequest;
}

const useEmployeeUpdate = (): UseMutationResult<PermissionResponse, Error, EmployeeUpdateProps> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (payload: EmployeeUpdateProps) =>
			await employeeRepository.update(payload.id, payload.employee),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [EMPLOYEE_PAGINATED_SEARCH] });
		},
	});

	return response;
};

export default useEmployeeUpdate;
