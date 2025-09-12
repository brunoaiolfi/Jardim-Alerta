import { PendingRequests } from "../../entities/PendingRequests";
import { RepBase } from "../base/RepBase";
import { IRepPendingRequests } from "./IRepPendingRequests";

export class RepPendingRequests extends RepBase<PendingRequests> implements IRepPendingRequests { }