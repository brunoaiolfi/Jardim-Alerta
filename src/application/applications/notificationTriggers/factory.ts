import { getRepNotificationTriggers } from "../../../infra/database/repositories/notificationTriggers/factory";
import { getNotificationImplementation } from "../../../infra/implementations/notifications/factory";
import { AplicNotificationTriggers } from "./AplicNotificationTriggers";

export function getAplicNotificationTriggers() {
    const repo = getRepNotificationTriggers();
    const notificationImpl = getNotificationImplementation();
    return new AplicNotificationTriggers(repo, notificationImpl);
}