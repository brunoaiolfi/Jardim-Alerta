import { getRepNotificationTriggers } from "../../../infra/database/repositories/notificationTriggers/factory";
import { AplicNotificationTriggers } from "./AplicNotificationTriggers";

export function getAplicNotificationTriggers() {
    const repo = getRepNotificationTriggers();
    return new AplicNotificationTriggers(repo);
}