import { useQuery } from '@tanstack/react-query';
import { getAplicPlants } from '../../../../application/plants/factory';

export function usePlantsByEnvironment(environmentId?: number) {
  const aplicPlants = getAplicPlants();
  
  return useQuery({
    queryKey: ['plants', 'byEnvironment', environmentId],
    queryFn: async () => {
      if (!environmentId) {
        throw new Error('Environment ID is required');
      }
      return await aplicPlants.getByEnvironments(environmentId);
    },
    enabled: !!environmentId, // só executa se tiver environmentId
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}