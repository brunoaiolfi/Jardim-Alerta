import { getServNotificationTriggers } from "../../infra/apis/notificationTriggers/service/factory";
import { getServPlants } from "../../infra/apis/plants/services/factory";
import { getRepPendingRequests } from "../../infra/database/repositories/pendingRequests/factory";
import { getAplicAuth } from "../auth/factory";
import { AplicPendingRequests } from "./AplicPendindgRequests";
import { IAplicPendingRequests } from "./IAplicPendingRequests";

export function getPendingRequestsAplic(): IAplicPendingRequests {
    const repository = getRepPendingRequests();
    const aplicAuth = getAplicAuth();
    const servPlants = getServPlants();
    const servNotificationTriggers = getServNotificationTriggers();

    return new AplicPendingRequests(repository, aplicAuth, servPlants, servNotificationTriggers);
}