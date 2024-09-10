export default interface EmployeeResponse {
	id: number;
	name: string;
	lastName: string;
	email: string;
	createdAt: Date;
	status: string;
	Permissions: any[];
}
