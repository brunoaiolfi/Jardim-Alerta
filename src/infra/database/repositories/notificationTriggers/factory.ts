
import { getDatabaseContextImplementation } from "../../../implementations/database/context/factory";
import { getDAOImplementation } from "../../../implementations/database/DAO/factory";
import { NotificationTrigger } from "../../entities/NotificationTrigger";
import { IRepNotificationTriggers } from "./IRepNotificationTriggers";
import { RepNotificationTriggers } from "./RepNotificationTriggers";

export function getRepNotificationTriggers() : IRepNotificationTriggers {
    const repository = getDatabaseContextImplementation().getRepository(NotificationTrigger);
    const _db = getDAOImplementation<NotificationTrigger>(repository);
    return new RepNotificationTriggers(_db);
}