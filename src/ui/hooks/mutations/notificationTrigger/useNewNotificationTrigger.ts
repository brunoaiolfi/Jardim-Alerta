import { getAplicNotificationTriggers } from '../../../../application/notificationTriggers/factory';
import { NotificationTrigger } from '../../../../infra/database/entities/NotificationTrigger';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationTriggersQueryKeys } from '../../queries/keys/notificationTriggers.keys';

export function useNewNotificationTrigger() {
    const AplicNotificationTriggers = getAplicNotificationTriggers();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (notificationTrigger: NotificationTrigger) => AplicNotificationTriggers.save(notificationTrigger),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: notificationTriggersQueryKeys.all
            })
        }
    })
}