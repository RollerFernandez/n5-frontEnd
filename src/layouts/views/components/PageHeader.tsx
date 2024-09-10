import { IconCore } from '@/core/components/general';
import { LocalStorageSession } from '@/core/sessions';
import { Link, useNavigate } from 'react-router-dom';
import { createRef } from 'react';
import {
	ModalSendResetLink,
	type ModalSendResetLinkRef,
} from '@/modules/auth/login/views/components';

// import { API_BASE_URL } from '@/core/constants/env';

// subdireccion-certificado
const PageHeader = (): JSX.Element => {
	const user = LocalStorageSession.getAuthorization();
	const navigate = useNavigate();

	const cerrarSesion = (e: { preventDefault: () => void }): void => {
		e.preventDefault();
		LocalStorageSession.removeAuthorization();
		// LocalStorageSession.removeIp();
		LocalStorageSession.removeMenuCargo();
		localStorage.removeItem('user');
		localStorage.removeItem('idDireccion');
		navigate('/login');
	};

	// const { data: notificaciones } = useListarNotificacionByIdUser(user?.persona.id ?? 0);

	const modalRef = createRef<ModalSendResetLinkRef>();

	return (
		<header className="topbar">
			<nav className="navbar top-navbar navbar-expand-md shadow-sm">
				<div className="navbar-header">
					<div className="navbar-brand" style={{ maxHeight: '57px' }}>
						<span id="logoIconSidebar">
							<img
								src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA1MiA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjAwMzYgMjkuNzc1OUMyMi45NzM5IDI2LjMyMTMgMjMuNjc3IDIzLjUxNjIgMjMuNjc3IDIzLjUxNjJMMTQuMjk1OSAxMC43OTg0QzcuODAyMzMgOS4zMDM4MiA4LjI4OTU1IDE2Ljc1ODYgOC4yODk1NSAxNi43NTg2TDI0LjA5MjkgMzguMTAwMkMyNC4wOTI5IDM4LjEwMDIgMjYuMTY3NiA0MC42NTgyIDI5LjA2OTQgMzkuNDAyNkMyOS45MDc0IDM5LjA0MTkgMzAuNDMyMSAzOC41NTY2IDMwLjc1NTEgMzguMDQ5N0MyNi42NzQ0IDM1LjA4NzYgMjQuNTg5IDMxLjczNTkgMjQuMDAzNiAyOS43NzMyIiBmaWxsPSIjRDdEN0Q3IiBmaWxsLW9wYWNpdHk9IjAuNyIvPgo8cGF0aCBkPSJNMTQuMzQzNSAxMC44NjM2TDcuNTIxNTMgMS42NDgxMkM3LjUyMTUzIDEuNjQ4MTIgNS44MTI3IC0wLjYzMjA2NyAyLjk4OTM0IDAuMTcxNTlDMS4xNzI1MyAwLjY4OTMyMyAwIDIuMjc1ODkgMCA0LjIwMDdWMzUuNzg1MUMwIDM4LjI2NjQgMS43MTUwOCA0MCA0LjE3MDc5IDQwQzYuNjI2NTEgNDAgOC4zNDA3IDM4LjI2NjQgOC4zNDA3IDM1Ljc4NTFWMTYuODY2MkM4LjM0MDcgMTIuNTAyNSAxMC41OTU2IDkuOTc0MjMgMTQuMzQzNSAxMC44NjYzIiBmaWxsPSIjRjNGM0YzIi8+CjxwYXRoIGQ9Ik00MS42NjU1IDYuMzg1MTlDNDAuNDI0MiA0LjExODUzIDM5LjUyMjEgMC4xMTgyNzkgMzMuMTc1NyAwLjExODI3OUwyNy4xMTc3IDAuMTEzNzdDMjMuMDE3NCAwLjExMzc3IDIyLjk3MzYgMy44NDk3NCAyMi45NzM2IDQuMjgyNjlDMjIuOTczNiA0LjI4OSAyMi45NzM2IDQuMjk1MzIgMjIuOTczNiA0LjMwMjUzQzIyLjk3MzYgNC4zMDk3NSAyNC42NjkxIDEwLjU4ODQgMzEuMjYyNiAxMC41NzY3QzMxLjE2NzEgOS40NjA5MSAzMS42OTM2IDguNTU4MDQgMzIuODc2OCA4LjQ5MjJINDUuMTkxMUM0NS4xMTA4IDguNDkyMiA0Mi44ODcxIDguMzAyNzggNDEuNjY5OSA2LjM4NTE5IiBmaWxsPSIjRDdEN0Q3IiBmaWxsLW9wYWNpdHk9IjAuNyIvPgo8cGF0aCBkPSJNNDMuMjIwMyAyMC4xOTI2QzQxLjY0NzEgMTkuMzM0OCAzOS41ODY3IDE4Ljg3NjYgMzcuNzQ5NCAxOC44NzY2QzM4LjU5MDggMTguOTc2OCAzOS40MTMxIDE5LjIwMTQgNDAuMTkgMTkuNTQzMUM0Mi4zMDY2IDIwLjQ3NCA0My42NzAxIDIyLjc5NjYgNDMuNjcwMSAyNS4yNjYyQzQzLjY2ODQgMjYuOTI5NiA0My4wMTM5IDI4LjUyNDUgNDEuODUwMiAyOS43MDA4QzQwLjY4NjUgMzAuODc3MSAzOS4xMDg3IDMxLjUzODYgMzcuNDYzIDMxLjU0MDNDMzMuOTgyOCAzMS41NDAzIDMxLjI1NTkgMjguODYzMiAzMS4yNTU5IDI1LjM0NTVDMzEuMjU1OSAyNS44NTMzIDMxLjIyMDIgMjYuMzQyMiAzMS4yNTA1IDI2LjgyMjFDMzEuNTMzNCAzNS45MDEzIDM3LjQyNTUgMzkuODkyNSAzNy40NjEyIDM5LjkxNzhDNDAuMzc2NCAzOS45MTQ1IDQzLjIyMyAzOS4wMjQxIDQ1LjYzMDYgMzcuMzYyNkM0OC4wMzgxIDM1LjcwMTEgNDkuODk1IDMzLjM0NTQgNTAuOTU5NiAzMC42MDIyQzUwLjk1OTYgMzAuNjAyMiA0OS4zNjY4IDIzLjM0NzcgNDMuMjIwMyAyMC4xOTI2WiIgZmlsbD0iI0Q3RDdENyIgZmlsbC1vcGFjaXR5PSIwLjciLz4KPHBhdGggZD0iTTMxLjI2MTYgMjUuMzQzN0MzMS4yNjE2IDIzLjcwMTIgMjkuODg4MyAyMS4zNTM0IDI3LjExNzYgMjEuMzUzNEMyNC42NzcgMjEuMzUzNCAyMi45NzI3IDIyLjg3NjggMjIuOTcyNyAyNS4zNDM3QzIyLjk3MjcgMzMuNDIzNiAyOS40NzYgMzkuOTE3OCAzNy40Njg3IDM5LjkxNzhDMzcuNDY4NyAzOS45MTc4IDMxLjI2MTYgMzUuNTYyMiAzMS4yNjE2IDI1LjM0MzdaIiBmaWxsPSIjRjNGM0YzIi8+CjxwYXRoIGQ9Ik00NS4xODU0IDAuMTEzNzA4SDMyLjg3MTFDMzIuOTczNyAwLjExMzcwOCAzMy4wNzE5IDAuMTEzNzA5IDMzLjE3MTggMC4xMTgyMThDMzguNDM2NiAwLjIxNDcyOSAzOS43NjA4IDIuODM3NjcgNDAuOTIzNiA1LjEyMzI3QzQxLjE0NzUgNS41NjQzMyA0MS4zNjk3IDUuOTkwOTYgNDEuNjA1MyA2LjM4NjAzQzQyLjI3MzcgNy40ODY0MyA0My4yMTE1IDguNDkyMTMgNDUuMTgxOCA4LjQ5MjEzQzQ3LjkyNTggOC40OTIxMyA0OS4zMjU4IDUuOTg5MTYgNDkuMzI1OCA0LjMwNDI3QzQ5LjMyNTggMS44NTk5MyA0Ny4yOTkzIDAuMTE1NTEyIDQ1LjE4MTggMC4xMTU1MTIiIGZpbGw9IiNGM0YzRjMiLz4KPHBhdGggZD0iTTM3LjQ2ODcgMTAuNDkzN0gzMS4yNjE2QzI0Ljg2NzEgMTAuNDkzNyAyMi45NzI3IDQuMjE5NTQgMjIuOTcyNyA0LjIxOTU0VjEzLjg0OTlDMjIuOTcyNyAxNy4xOCAyNi4zMzQxIDE4Ljg3MyAzMS4yMDM2IDE4Ljg3M0gzNy40Njg3QzQ3LjkyNDMgMTguODczIDUwLjk2NjIgMzAuNTk4NiA1MC45NjYyIDMwLjU5ODZDNTUuMTQ3OCAxOS4wMiA0NS44MjQ2IDEwLjQ5MzcgMzcuNDY4NyAxMC40OTM3WiIgZmlsbD0iI0YzRjNGMyIvPgo8cGF0aCBkPSJNMjQuMDA0MiAyOS43NzU4QzIyLjk3NDQgMjYuMzIxMyAyMy42Nzc2IDIzLjUxNjEgMjMuNjc3NiAyMy41MTYxTDE0LjI5NjEgMTAuNzk4M0M3LjgwMjMxIDkuMzAzNzYgOC4yODk1NSAxNi43NTg2IDguMjg5NTUgMTYuNzU4NkwyNC4wOTM0IDM4LjEwMDFDMjQuMDkzNCAzOC4xMDAxIDI2LjE2ODIgNDAuNjU4MSAyOS4wNzAyIDM5LjQwMjZDMjkuOTA4MSAzOS4wNDE4IDMwLjQzMjkgMzguNTU2NSAzMC43NTU5IDM4LjA0OTZDMjYuNjc1MSAzNS4wODc1IDI0LjU4OTYgMzEuNzM1OCAyNC4wMDQyIDI5Ljc3MzEiIGZpbGw9IiMzNTZCRTkiLz4KPHBhdGggZD0iTTE0LjM0NCAxMC44NjM2TDcuNTIxOCAxLjY0ODEyQzcuNTIxOCAxLjY0ODEyIDUuODEyOTEgLTAuNjMyMDY3IDIuOTg5NDQgMC4xNzE1OUMxLjE3MjU4IDAuNjg5MzIzIDAgMi4yNzU4OSAwIDQuMjAwN1YzNS43ODUxQzAgMzguMjY2NCAxLjcxNTE0IDQwIDQuMTcwOTUgNDBDNi42MjY3NSA0MCA4LjM0MSAzOC4yNjY0IDguMzQxIDM1Ljc4NTFWMTYuODY2MkM4LjM0MSAxMi41MDI1IDEwLjU5NiA5Ljk3NDIzIDE0LjM0NCAxMC44NjYzIiBmaWxsPSIjMzM3QkU0Ii8+CjxwYXRoIGQ9Ik00MS42NjUyIDYuMzg1MTNDNDAuNDIzOSA0LjExODQ3IDM5LjUyMTcgMC4xMTgyMTggMzMuMTc1MSAwLjExODIxOEwyNy4xMTY4IDAuMTEzNzA4QzIzLjAxNjQgMC4xMTM3MDggMjIuOTcyNyAzLjg0OTY4IDIyLjk3MjcgNC4yODI2M0MyMi45NzI3IDQuMjg4OTQgMjIuOTcyNyA0LjI5NTI1IDIyLjk3MjcgNC4zMDI0N0MyMi45NzI3IDQuMzA5NjkgMjQuNjY4MiAxMC41ODgzIDMxLjI2MTkgMTAuNTc2NkMzMS4xNjY0IDkuNDYwODUgMzEuNjkyOSA4LjU1Nzk4IDMyLjg3NjIgOC40OTIxM0g0NS4xOTA5QzQ1LjExMDYgOC40OTIxMyA0Mi44ODY4IDguMzAyNzIgNDEuNjY5NiA2LjM4NTEzIiBmaWxsPSIjMzU2QkU5Ii8+CjxwYXRoIGQ9Ik00My4yMjg2IDIwLjE5MjVDNDEuNjU1MyAxOS4zMzQ3IDM5LjU5NDggMTguODc2NSAzNy43NTc1IDE4Ljg3NjVDMzguNTk4OSAxOC45NzY4IDM5LjQyMTIgMTkuMjAxNCA0MC4xOTgxIDE5LjU0MzFDNDIuMzE0OCAyMC40NzM5IDQzLjY3ODMgMjIuNzk2NSA0My42NzgzIDI1LjI2NjFDNDMuNjc2NyAyNi45Mjk2IDQzLjAyMjIgMjguNTI0NSA0MS44NTg0IDI5LjcwMDdDNDAuNjk0NyAzMC44NzcgMzkuMTE2OCAzMS41Mzg2IDM3LjQ3MSAzMS41NDAyQzMzLjk5MDggMzEuNTQwMiAzMS4yNjM3IDI4Ljg2MzIgMzEuMjYzNyAyNS4zNDU1QzMxLjI2MzcgMjUuODUzMyAzMS4yMjggMjYuMzQyMiAzMS4yNTgzIDI2LjgyMkMzMS41NDEyIDM1LjkwMTMgMzcuNDMzNSAzOS44OTI1IDM3LjQ2OTIgMzkuOTE3N0M0MC4zODQ1IDM5LjkxNDQgNDMuMjMxMyAzOS4wMjQgNDUuNjM4OSAzNy4zNjI1QzQ4LjA0NjUgMzUuNzAxIDQ5LjkwMzUgMzMuMzQ1MyA1MC45NjgxIDMwLjYwMjJDNTAuOTY4MSAzMC42MDIyIDQ5LjM3NTIgMjMuMzQ3NiA0My4yMjg2IDIwLjE5MjVaIiBmaWxsPSIjMzU2QkU5Ii8+CjxwYXRoIGQ9Ik0zMS4yNjE5IDI1LjM0MzdDMzEuMjYxOSAyMy43MDEyIDI5Ljg4ODUgMjEuMzUzMyAyNy4xMTc3IDIxLjM1MzNDMjQuNjc3MSAyMS4zNTMzIDIyLjk3MjcgMjIuODc2OCAyMi45NzI3IDI1LjM0MzdDMjIuOTcyNyAzMy40MjM1IDI5LjQ3NjMgMzkuOTE3NyAzNy40NjkyIDM5LjkxNzdDMzcuNDY5MiAzOS45MTc3IDMxLjI2MTkgMzUuNTYyMSAzMS4yNjE5IDI1LjM0MzdaIiBmaWxsPSIjMzM3QkU0Ii8+CjxwYXRoIGQ9Ik00NS4xODU4IDAuMTEzNzA4SDMyLjg3MTFDMzIuOTczNyAwLjExMzcwOCAzMy4wNzE5IDAuMTEzNzA5IDMzLjE3MTggMC4xMTgyMThDMzguNDM2OCAwLjIxNDcyOSAzOS43NjExIDIuODM3NjcgNDAuOTIzOSA1LjEyMzI3QzQxLjE0NzggNS41NjQzMyA0MS4zNyA1Ljk5MDk2IDQxLjYwNTYgNi4zODYwM0M0Mi4yNzQgNy40ODY0MyA0My4yMTE5IDguNDkyMTMgNDUuMTgyMyA4LjQ5MjEzQzQ3LjkyNjMgOC40OTIxMyA0OS4zMjY0IDUuOTg5MTYgNDkuMzI2NCA0LjMwNDI3QzQ5LjMyNjQgMS44NTk5MyA0Ny4yOTk5IDAuMTE1NTEyIDQ1LjE4MjMgMC4xMTU1MTIiIGZpbGw9IiMzMzdCRTQiLz4KPHBhdGggZD0iTTM3LjQ2OTIgMTAuNDkzNUgzMS4yNjE5QzI0Ljg2NzIgMTAuNDkzNSAyMi45NzI3IDQuMjE5NDIgMjIuOTcyNyA0LjIxOTQyVjEzLjg0OThDMjIuOTcyNyAxNy4xNzk5IDI2LjMzNDIgMTguODcyOSAzMS4yMDM5IDE4Ljg3MjlIMzcuNDY5MkM0Ny45MjUyIDE4Ljg3MjkgNTAuOTY3MyAzMC41OTg1IDUwLjk2NzMgMzAuNTk4NUM1NS4xNDg5IDE5LjAxOTkgNDUuODI1NCAxMC40OTM1IDM3LjQ2OTIgMTAuNDkzNVoiIGZpbGw9IiMzMzdCRTQiLz4KPC9zdmc+Cg=="
								alt="Sanipes"
								className="img-fluid"
								style={{ maxHeight: '48px' }}
							/>
						</span>
					</div>
				</div>

				<div className="navbar-collapse">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<a className="nav-link nav-toggler d-block d-md-none" href="#">
								<IconCore icon="fa-solid fa-bars" />
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link sidebartoggler d-none d-md-block" href="#">
								<IconCore icon="fa-solid fa-bars" />
							</a>
						</li>
					</ul>

					<ul className="navbar-nav my-lg-0 pe-2">
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle waves-effect waves-dark"
								href=""
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							></a>
						</li>

						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle profile-pic"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<IconCore icon="fa-solid fa-circle-user" />
								<span className="hidden-md-down ms-1">
									{`${user?.persona?.nombres ?? ''} ${user?.persona?.apePaternos ?? ''} ${
										user?.persona?.apeMaternos ?? ''
									}`}{' '}
									&nbsp;
									<IconCore icon="fa-solid fa-angle-down" />
								</span>
							</a>
							<div className="dropdown-menu dropdown-menu-end animated flipInY">
								{/* <a href="#" className="dropdown-item">
									<IconCore icon="fa-regular fa-user" /> {''}
									Mi cuenta
								</a> */}
								<Link to={`/usuarios/editar/${user?.persona?.id}`} className="dropdown-item">
									<IconCore icon="fa-regular fa-user" /> {''}
									Mi cuenta
								</Link>
								<a
									href="#"
									className="dropdown-item"
									onClick={() => modalRef.current?.openModal(user?.email ?? '')}
								>
									<IconCore icon="fa-solid fa-gear" /> {''}
									Cambiar contraseña
								</a>
								<div className="dropdown-divider"></div>
								<a href="#" className="dropdown-item" onClick={cerrarSesion}>
									<IconCore icon="fa-solid fa-power-off" /> {''}
									Cerrar sesión
								</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
			<ModalSendResetLink ref={modalRef} />
		</header>
	);
};

export default PageHeader;
