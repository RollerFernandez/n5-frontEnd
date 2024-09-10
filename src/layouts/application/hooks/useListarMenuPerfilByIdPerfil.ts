import { type MenuPerfilSidebarResponse } from '@/layouts/domain';
import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { LISTAR_MENU_PERFIL_FIND_BY_ID_PERFIL } from './QueryKeys';
import { menuPerfilSidebarRepository } from '@/layouts/infrastructure';

const useListarMenuPerfilByIdPerfil = (
	id?: number,
): UseQueryResult<MenuPerfilSidebarResponse[], Error> => {
	const response = useQuery({
		queryKey: [LISTAR_MENU_PERFIL_FIND_BY_ID_PERFIL, id],
		queryFn: async () =>
			await menuPerfilSidebarRepository.listarmenuperfilsidebarByIdPerfil(Number(id)),
		enabled: !(id == null),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useListarMenuPerfilByIdPerfil;
