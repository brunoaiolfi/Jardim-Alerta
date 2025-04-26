import { NotificationTrigger } from "../../../infra/database/entities/NotificationTrigger";
import { IRepNotificationTriggers } from "../../../infra/database/repositories/notificationTriggers/RepNotificationTriggers";
import { AplicBase } from "../base/AplicBase";

export class AplicNotificationTriggers extends AplicBase<NotificationTrigger> {
    constructor(rep: IRepNotificationTriggers) {
        super(rep);
    }
}