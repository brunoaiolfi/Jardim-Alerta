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

    public async delete(entidade: NotificationTrigger): Promise<void> {
        try {
            await this.repository.delete(entidade);
            for (const triggerId of entidade.triggersId) {
                this.notificationImplementation.deleteTriggerNotification(triggerId);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    public override async save(entidade: NotificationTrigger): Promise<void> {
        try {
            const bodyNotification = {
                title: "Heeey 🌱",
                body: `Está na hora de cuidar da sua ${entidade.plant?.name}! Lembre-se ${entidade.plant?.waterTips}!`,
            }

            const triggersId = await this.notificationImplementation.createTriggerNotification(bodyNotification, {
                days: entidade.weekDay,
                hours: parseInt(entidade.time.split(':')[0]),
                minutes: parseInt(entidade.time.split(':')[1]),
            });

            entidade.triggersId = triggersId;

            if (!ValidateNotificationTriggerUseCase.validate({
                id: entidade.id,
                plantId: entidade.plantId,
                time: entidade.time,
                triggersId: entidade.triggersId,
                weekDay: entidade.weekDay
            })) {
                throw new Error("Notificação inválida.");
            }

            await super.save(entidade);
        } catch (error) {
            throw new Error(error);
        }
    }
}