import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { LoginRequest, UserSecurityResponse } from '../../domain';
import { authRepository } from '@/modules/auth/login/infrastructure';
import { toastWarning } from '@/core/helpers/ToastHelper';

const useLogin = (): UseMutationResult<UserSecurityResponse, Error, LoginRequest> => {
	const response = useMutation({
		mutationFn: async (login: LoginRequest) => await authRepository.login(login),
		onError: (error: Error) => {
			if ((error as any).response !== undefined) {
				console.log('error', (error as any).response.data.Message);
				toastWarning((error as any).response.data.Message);
			} else {
				console.log('error', error.message);
			}
		},
	});
	return response;
};

export default useLogin;
