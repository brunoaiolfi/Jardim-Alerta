import { useQuery } from "@tanstack/react-query";
import { getAplicNotificationTriggers } from "../../../../application/notificationTriggers/factory";
import { notificationTriggersQueryKeys } from "../keys/notificationTriggers.keys";

export function useNotificationTriggersQuery() {
    const aplicNotificationTriggers = getAplicNotificationTriggers();

    return useQuery({
        queryKey: notificationTriggersQueryKeys.all,
        queryFn: () => aplicNotificationTriggers.getNotificationsWithPlants(),
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
    })
}