export default interface MenuPerfilSidebarResponse {
	id: number;
	nombre: string;
	urlMenu: string;
	icono: string;
	key: string;
	children?: MenuPerfilSidebarResponse[];
}
