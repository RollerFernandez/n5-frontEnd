import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { PrivateOutlet, PrivatePerfilOutlet, PublicOutlet } from '@/routers/CheckPageNavigation';

const routes: RouteObject[] = [
	{
		path: '/',
		async lazy() {
			const { default: AdminLayout } = await import('@/layouts/views/Admin');

			return {
				element: (
					<PrivateOutlet>
						<PrivatePerfilOutlet>{<AdminLayout />}</PrivatePerfilOutlet>
					</PrivateOutlet>
				),
			};
		},
		children: [
			{
				index: true,
				async lazy() {
					const { default: Home } = await import('@/modules/home');

					return { Component: Home };
				},
			},
			{
				path: '/employee',
				async lazy() {
					const { default: PermisosList } = await import('@/modules/admin/permisos/views');

					return { Component: PermisosList };
				},
			},
		],
	},
	{
		path: '/login',
		async lazy() {
			const { default: AuthLayout } = await import('@/layouts/views/Auth');

			return { element: <PublicOutlet>{<AuthLayout />}</PublicOutlet> };
		},
		children: [
			{
				index: true,
				async lazy() {
					const { default: Login } = await import('@/modules/auth/login/views');

					return { Component: Login };
				},
			},
		],
	},
	{
		path: '/register',
		async lazy() {
			const { default: AuthLayout } = await import('@/layouts/views/Auth');

			return { element: <PublicOutlet>{<AuthLayout />}</PublicOutlet> };
		},
		children: [
			{
				index: true,
				async lazy() {
					const { default: Register } = await import('@/modules/auth/register/views');

					return { Component: Register };
				},
			},
		],
	},
	{
		path: '/send-reset-link',
		async lazy() {
			const { default: AuthLayout } = await import('@/layouts/views/Auth');

			return { element: <PublicOutlet>{<AuthLayout />}</PublicOutlet> };
		},
		children: [
			{
				index: true,
				async lazy() {
					const { default: SendResetLink } = await import('@/modules/auth/send-reset-link/views');

					return { Component: SendResetLink };
				},
			},
		],
	},
];

export default createBrowserRouter(routes);
