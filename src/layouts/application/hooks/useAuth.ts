import { LocalStorageSession } from '@/core/sessions';

const useAuth = (): boolean => {
	return LocalStorageSession.isValidAuthorization();
};

export default useAuth;
