import { NotificationTrigger } from "../../../infra/database/entities/NotificationTrigger";
import { IRepNotificationTriggers } from "../../../infra/database/repositories/notificationTriggers/RepNotificationTriggers";
import { INotificationsImplementation } from "../../../infra/implementations/notifications/Notifications";
import { AplicBase } from "../base/AplicBase";

export class AplicNotificationTriggers extends AplicBase<NotificationTrigger> {

    private notificationImplementation: INotificationsImplementation;

    constructor(
        rep: IRepNotificationTriggers,
        notificationImpl: INotificationsImplementation
    ) {
        super(rep);
        this.notificationImplementation = notificationImpl;
    }

    public async delete(model: NotificationTrigger): Promise<void> {
        try {
            await this.repository.delete(model);
            this.notificationImplementation.deleteTriggerNotification(model.id);
        } catch (error) {
            throw new Error(error);
        }
    }
}