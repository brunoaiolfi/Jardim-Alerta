import { NotificationTrigger } from "../../entities/NotificationTrigger";
import { IRepBase, RepBase } from "../base/RepBase";

export interface IRepNotificationTriggers extends IRepBase<NotificationTrigger> { }

export class RepNotificationTriggers extends RepBase<NotificationTrigger> { }