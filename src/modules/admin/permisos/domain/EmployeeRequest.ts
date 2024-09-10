export default interface EmployeeRequest {
	id?: number | null;
	name: string;
	lastName: string;
	email: string;
	status: string;
	permissions: any[];
	recordState: null;
}
