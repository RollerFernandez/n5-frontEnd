import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constants/env';
import PermissionTypeResponse from '../../domain/PermissionTypeResponse';
import PermissionTypeResponseMap from '../model/PermissionTypeResponseMap';

const mapPermissionTypeResponse = (item: PermissionTypeResponseMap): PermissionTypeResponse => ({
	id: item.id,
	name: item.name,
});

export const findAll = async (): Promise<PermissionTypeResponse[]> => {
	const response: AxiosResponse<PermissionTypeResponseMap> = await axios.get(
		`${API_BASE_URL}/api/PermissionType`,
	);

	const permissionTypes: PermissionTypeResponse[] = response.data.Data.map(item => {
		const permissionType: PermissionTypeResponse = mapPermissionTypeResponse(item);
		return permissionType;
	});

	return permissionTypes;
};
