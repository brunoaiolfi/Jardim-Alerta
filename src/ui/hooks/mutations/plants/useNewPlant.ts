import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAplicPlants } from "../../../../application/plants/factory";
import { Plants } from "../../../../infra/database/entities/Plants";
import { plantsQueryKeys } from "../../queries/keys/plants.keys";

export function useNewPlantMutation() {
    const aplicPlants = getAplicPlants();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (plant: Plants) => aplicPlants.save(plant),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: plantsQueryKeys.all
            });
        }
    })
}