import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type SubTramiteRequisitoMedium } from '../../domain';
import { subTramiteRequisitoRepository } from '../../infrastructure';
import { SUB_TRAMITE_REQUISITO_FIND_ALL_BY_ID_EXPEDIENTE } from './QueryKeys';

const useSubTramiteRequisitoFindAllByIdExpediente = (
	idExpediente?: number,
): UseQueryResult<SubTramiteRequisitoMedium[], Error> => {
	const response = useQuery({
		queryKey: [SUB_TRAMITE_REQUISITO_FIND_ALL_BY_ID_EXPEDIENTE, idExpediente],
		queryFn: async () =>
			await subTramiteRequisitoRepository.findAllByIdExpediente(Number(idExpediente)),
		enabled: !(idExpediente == null),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useSubTramiteRequisitoFindAllByIdExpediente;
