import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { PERMISSIONTYPE_FIND_ALL } from './QueryKeys';
import PermissionTypeResponse from '../../domain/PermissionTypeResponse';
import { permissionTypeRepository } from '../../infrastructure';

const usePermissionTypeFindAll = (): UseQueryResult<PermissionTypeResponse[], Error> => {
	const response = useQuery({
		queryKey: [PERMISSIONTYPE_FIND_ALL],
		queryFn: async () => await permissionTypeRepository.findAll(),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default usePermissionTypeFindAll;
