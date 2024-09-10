import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constants/env';
import type { PaginationRequest, PaginationResponse } from '@/modules/shared/domain';
import { stringify } from 'qs';
import EmployeeFilter from '../../domain/EmployeeFilter';
import EmployeeResponse from '../../domain/EmployeeResponse';
import EmployeeResponseMap from '../model/PermissionResponseMap';
import EmployeesResponseMap from '@/modules/shared/domain/EmployeesResponseMap';
import EmployeeRequest from '../../domain/EmployeeRequest';
import EmployeeRequestMap from '../model/EmployeeRequestMap';

const mapEmployeeResponse = (item: EmployeeResponseMap): EmployeeResponse => ({
	id: item.id,
	name: item.name,
	lastName: item.lastName,
	email: item.email,
	status: item.status,
	Permissions: item.permissions,
	createdAt: item.createdAt,
});

export const findById = async (id: number): Promise<EmployeeResponse> => {
	const response: AxiosResponse<EmployeeResponseMap> = await axios.get(
		`${API_BASE_URL}/api/Employee/${id}`,
	);

	const employee: EmployeeResponse = mapEmployeeResponse(response.data.Data);

	return employee;
};

export const create = async (employee: EmployeeRequest): Promise<EmployeeResponse> => {
	const employeeRequestMap: EmployeeRequestMap = {
		name: employee.name,
		lastName: employee.lastName,
		email: employee.email,
		Permissions: employee.permissions.map((item: any) => ({
			permissionTypeId: item.id,
			label: item.name,
		})),
		status: employee.status,
	};

	const response: AxiosResponse<EmployeeResponseMap> = await axios.post(
		`${API_BASE_URL}/api/Employee`,
		employeeRequestMap,
	);

	const newEmployee: EmployeeResponse = mapEmployeeResponse(response.data);

	return newEmployee;
};

export const update = async (id: number, employee: EmployeeRequest): Promise<EmployeeResponse> => {
	const employeeRequestMap: EmployeeRequestMap = {
		id: id,
		name: employee.name,
		lastName: employee.lastName,
		email: employee.email,
		status: employee.status,
		Permissions: employee.permissions,
	};

	const response: AxiosResponse<EmployeeResponseMap> = await axios.put(
		`${API_BASE_URL}/api/Employee/`,
		employeeRequestMap,
	);

	const updatedEmployee: EmployeeResponse = mapEmployeeResponse(response.data);

	return updatedEmployee;
};

export const deleteById = async (employee: EmployeeRequest): Promise<EmployeeResponse> => {
	const response: AxiosResponse<EmployeeResponseMap> = await axios.delete(
		`${API_BASE_URL}/api/Employee/`,
		{
			data: employee,
		},
	);

	const updatedEmployee: EmployeeResponse = mapEmployeeResponse(response.data);

	return updatedEmployee;
};

export const paginatedSearch = async (
	paginationRequest: PaginationRequest<EmployeeFilter>,
): Promise<PaginationResponse<EmployeeResponse>> => {
	const paramsString: string = stringify(paginationRequest, { allowDots: true });
	const responseMap: AxiosResponse<EmployeesResponseMap> = await axios.get(
		`${API_BASE_URL}/api/Employee/List?${paramsString}`,
	);

	const paginationResponse: PaginationResponse<EmployeeResponseMap> = responseMap.data.Data;

	const permissions: EmployeeResponse[] = paginationResponse.items.map(item => {
		const permission: EmployeeResponse = mapEmployeeResponse(item);
		return permission;
	});

	const paginationEmployee: PaginationResponse<EmployeeResponse> = {
		from: paginationResponse.from,
		to: paginationResponse.to,
		pageSize: paginationResponse.pageSize,
		currentPage: paginationResponse.currentPage,
		lastPage: paginationResponse.lastPage,
		totalPages: paginationResponse.totalPages,
		totalCount: paginationResponse.totalCount,
		items: permissions,
	};

	return paginationEmployee;
};
