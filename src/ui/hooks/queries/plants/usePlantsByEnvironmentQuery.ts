import { useQuery } from '@tanstack/react-query';
import { getAplicPlants } from '../../../../application/plants/factory';
import { plantsQueryKeys } from '../keys/plants.keys';

export function usePlantsByEnvironmentQuery(environmentId?: number) {
  const aplicPlants = getAplicPlants();

  return useQuery({
    queryKey: plantsQueryKeys.byEnvironment(environmentId),
    queryFn: () => aplicPlants.getByEnvironments(environmentId),
    enabled: !!environmentId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}