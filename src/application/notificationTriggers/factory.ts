import { getRepNotificationTriggers } from "../../infra/database/repositories/notificationTriggers/factory";
import { getNotificationImplementation } from "../../infra/implementations/notifications/factory";
import { getPendingRequestsAplic } from "../pendingRequests/factory";
import { AplicNotificationTriggers } from "./AplicNotificationTriggers";
import { IAplicNotificationTriggers } from "./IAplicNotificationTriggers";

export function getAplicNotificationTriggers() : IAplicNotificationTriggers {
    const repo = getRepNotificationTriggers();
    const notificationImpl = getNotificationImplementation();
    const pendingRequestsAplic = getPendingRequestsAplic();
    return new AplicNotificationTriggers(repo, notificationImpl, pendingRequestsAplic);
}