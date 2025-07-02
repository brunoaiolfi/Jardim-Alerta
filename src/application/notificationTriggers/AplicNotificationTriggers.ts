import { ValidateNotificationTriggerUseCase } from "../../domain/notifications/useCases/ValidateNotificationTrigger";
import { NotificationTrigger } from "../../infra/database/entities/NotificationTrigger";
import { IRepNotificationTriggers } from "../../infra/database/repositories/notificationTriggers/IRepNotificationTriggers";
import { INotificationsImplementation } from "../../infra/implementations/notifications/INotifications";
import { AplicBase } from "../base/AplicBase";
import { IAplicNotificationTriggers } from "./IAplicNotificationTriggers";

export class AplicNotificationTriggers extends AplicBase<NotificationTrigger> implements IAplicNotificationTriggers {

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
            for (const triggerId of model.triggersId) {
                this.notificationImplementation.deleteTriggerNotification(triggerId);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    public override async save(model: NotificationTrigger): Promise<void> {
        try {
            const bodyNotification = {
                title: "Heeey 🌱",
                body: `Está na hora de cuidar da sua ${model.plant?.name}! Lembre-se ${model.plant?.waterTips}!`,
            }

            const triggersId = await this.notificationImplementation.createTriggerNotification(bodyNotification, {
                days: model.weekDay,
                hours: parseInt(model.time.split(':')[0]),
                minutes: parseInt(model.time.split(':')[1]),
            });

            model.triggersId = triggersId;
            
            if (!ValidateNotificationTriggerUseCase.validate(model)) {
                throw new Error("Notificação inválida.");
            }

            await super.save(model);
        } catch (error) {
            throw new Error(error);
        }
    }
}