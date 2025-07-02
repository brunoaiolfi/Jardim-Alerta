import { NotificationTrigger } from "../../entities/NotificationTrigger";
import { RepBase } from "../base/RepBase";
import { IRepNotificationTriggers } from "./IRepNotificationTriggers";

export class RepNotificationTriggers extends RepBase<NotificationTrigger> implements IRepNotificationTriggers { }