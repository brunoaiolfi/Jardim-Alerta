import { Result } from "../../domain/result/model/Result";
import { NotificationTrigger } from "../../infra/database/entities/NotificationTrigger";
import { IAplicBase } from "../base/IAplicBase";

export interface IAplicNotificationTriggers extends IAplicBase<NotificationTrigger> { 
    getNotificationsWithPlants(): Promise<Result<NotificationTrigger[]>>
}