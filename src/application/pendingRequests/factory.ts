import { getRepPendingRequests } from "../../infra/database/repositories/pendingRequests/factory";
import { AplicPendingRequests } from "./AplicPendindgRequests";
import { IAplicPendingRequests } from "./IAplicPendingRequests";

export function getPendingRequestsAplic(): IAplicPendingRequests {
    const repository = getRepPendingRequests();
    return new AplicPendingRequests(repository);
}