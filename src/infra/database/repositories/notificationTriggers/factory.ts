
import { getDatabaseContext } from "../../context/factory";
import { NotificationTrigger } from "../../entities/NotificationTrigger";
import { IRepNotificationTriggers } from "./IRepNotificationTriggers";
import { RepNotificationTriggers } from "./RepNotificationTriggers";

export function getRepNotificationTriggers() : IRepNotificationTriggers {
    const repository = getDatabaseContext().getRepository(NotificationTrigger);
    return new RepNotificationTriggers(repository);
}