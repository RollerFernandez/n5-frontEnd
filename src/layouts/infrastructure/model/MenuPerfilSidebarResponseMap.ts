export default interface MenuPerfilSidebarResponseMap {
	id: number;
	nombre: string;
	urlMenu: string;
	icono: string;
	key: string;
	children?: MenuPerfilSidebarResponseMap[];
}
