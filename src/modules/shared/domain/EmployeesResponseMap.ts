export default interface EmployeesResponseMap {
	TransactionId: string;
	Status: number;
	Success: boolean;
	Data: any;
	totalCount: number;
	totalPages: number;
	pageSize: number;
}
