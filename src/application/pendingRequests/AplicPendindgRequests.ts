import { PendingRequests } from "../../infra/database/entities/PendingRequests";
import { IRepPendingRequests } from "../../infra/database/repositories/pendingRequests/IRepPendingRequests";
import { AplicBase } from "../base/AplicBase";
import { IAplicPendingRequests } from "./IAplicPendingRequests";

export class AplicPendingRequests extends AplicBase<PendingRequests> implements IAplicPendingRequests {
    constructor(repEnvironments: IRepPendingRequests) {
        super(repEnvironments);
    }
}