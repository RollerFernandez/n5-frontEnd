import { type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '@/layouts/application/hooks/useAuth';
import { LocalStorageSession } from '@/core/sessions';
import { type MenuPerfilSidebarResponse } from '@/layouts/domain';

interface BaseProps {
	children: ReactElement;
}
export const PrivateOutlet = ({ children }: BaseProps): JSX.Element => {
	// const auth = useAuth();
	// if (!auth) return <Navigate to="/login" replace />;

	return children;
};

export const PublicOutlet = ({ children }: BaseProps): JSX.Element => {
	const auth = useAuth();

	if (auth) return <Navigate to="/" replace />;

	return children;
};

export const PrivatePerfilOutlet = ({ children }: BaseProps): JSX.Element => {
	const ruta = window.location.pathname.toUpperCase();
	const registrar = 'REGISTRAR';
	const editar = 'EDITAR';

	const menus = LocalStorageSession.getMenuCargo();
	// Hooks
	// const { data: menus } = useListarMenuPerfilByIdPerfil(perfil.id);

	const checkAccess = (menu: MenuPerfilSidebarResponse): boolean => {
		if (ruta.includes(menu.urlMenu.toUpperCase())) {
			if ((ruta.includes(registrar) || ruta.includes(editar)) && !menu) {
				return false;
			}
			return true;
		}
		if (menu.children != null) {
			for (const child of menu.children) {
				if (checkAccess(child)) return true;
			}
		}
		return false;
	};

	var tieneAcceso = false;
	for (const menu of menus ?? []) {
		if (checkAccess(menu)) {
			tieneAcceso = true;
			break;
		}
	}
	console.log(tieneAcceso);
	//return <>{!tieneAcceso ? <PageNotFound /> : children}</>;
	return <>{children}</>;
};
