import { type MenuPerfilSidebarResponse } from '@/layouts/domain';
import axios, { type AxiosResponse } from 'axios';
import { type MenuPerfilSidebarResponseMap } from '../model';
import { API_BASE_URL } from '@/core/constants/env';

export const listarmenuperfilsidebarByIdPerfil = async (
	id: number,
): Promise<MenuPerfilSidebarResponse[]> => {
	const response: AxiosResponse<MenuPerfilSidebarResponseMap[]> = await axios.get(
		`${API_BASE_URL}/api/menu/listarmenucargosidebar/${id}`,
	);

	const menusPerfil: MenuPerfilSidebarResponse[] = response.data.map(item => {
		const menuPerfil: MenuPerfilSidebarResponse = {
			id: item.id,
			nombre: item.nombre,
			urlMenu: item.urlMenu,
			icono: item.icono,
			key: item.key,
			children: item.children,
		};

		return menuPerfil;
	});

	return menusPerfil;
};
