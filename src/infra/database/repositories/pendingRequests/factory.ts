import { getDatabaseContext } from "../../context/factory";
import { PendingRequests } from "../../entities/PendingRequests";
import { IRepPendingRequests } from "./IRepPendingRequests";
import { RepPendingRequests } from "./RepPendingRequests";

export function getRepPendingRequests(): IRepPendingRequests {
    const repository = getDatabaseContext().getRepository(PendingRequests);
    return new RepPendingRequests(repository);
}