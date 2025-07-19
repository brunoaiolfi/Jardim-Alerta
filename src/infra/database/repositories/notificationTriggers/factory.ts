
import { getDatabaseContext } from "../../context/factory";
import { getDAO } from "../../DAO/factory";
import { NotificationTrigger } from "../../entities/NotificationTrigger";
import { IRepNotificationTriggers } from "./IRepNotificationTriggers";
import { RepNotificationTriggers } from "./RepNotificationTriggers";

export function getRepNotificationTriggers() : IRepNotificationTriggers {
    const repository = getDatabaseContext().getRepository(NotificationTrigger);
    const _db = getDAO<NotificationTrigger>(repository);
    return new RepNotificationTriggers(_db);
}