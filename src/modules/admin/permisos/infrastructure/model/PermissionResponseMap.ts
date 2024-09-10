export default interface PermissionResponseMap {
	id: number;
	name: string;
	lastName: string;
	email: string;
	createdAt: Date;
	status: string;
	permissions: any[];
	Data: any;
}
