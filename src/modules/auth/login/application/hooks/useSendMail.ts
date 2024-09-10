import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import type { MailRequest, MailResponse } from '../../domain';
import { authRepository } from '../../infrastructure';

const useSendMail = (): UseMutationResult<MailResponse, Error, MailRequest> => {
	const response = useMutation({
		mutationFn: async (mail: MailRequest) => await authRepository.sendMail(mail),
	});

	return response;
};

export default useSendMail;
