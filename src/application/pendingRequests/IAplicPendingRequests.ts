import { PendingRequests } from "../../infra/database/entities/PendingRequests";
import { IAplicBase } from "../base/IAplicBase";

export interface IAplicPendingRequests extends IAplicBase<PendingRequests> { }