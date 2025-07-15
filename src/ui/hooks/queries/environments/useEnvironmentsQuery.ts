import { useQuery } from "@tanstack/react-query";
import { getAplicEnvironments } from "../../../../application/environments/factory";
import { environmentsQueryKeys } from "../keys/environments.keys";

export function useEnvironmentsQuery() {
    const aplicEnvironment = getAplicEnvironments();

    return useQuery({
        queryKey: environmentsQueryKeys.all,
        queryFn: () => aplicEnvironment.get(),
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
    })
}