import { ValidateNotificationTriggerUseCase } from "../../domain/notifications/useCases/ValidateNotificationTrigger";
import { Result } from "../../domain/result/model/Result";
import { NotificationTrigger } from "../../infra/database/entities/NotificationTrigger";
import { PendingMethod, PendingRequests } from "../../infra/database/entities/PendingRequests";
import { IRepNotificationTriggers } from "../../infra/database/repositories/notificationTriggers/IRepNotificationTriggers";
import { INotificationsImplementation } from "../../infra/implementations/notifications/INotifications";
import { AplicBase } from "../base/AplicBase";
import { IAplicPendingRequests } from "../pendingRequests/IAplicPendingRequests";
import { IAplicNotificationTriggers } from "./IAplicNotificationTriggers";

export class AplicNotificationTriggers extends AplicBase<NotificationTrigger> implements IAplicNotificationTriggers {

    private readonly _notificationImplementation: INotificationsImplementation;
    private readonly _aplicPendingRequests: IAplicPendingRequests;
 

    constructor(
        rep: IRepNotificationTriggers,
        notificationImpl: INotificationsImplementation,
        aplicPendingRequests: IAplicPendingRequests
    ) {
        super(rep);
        this._aplicPendingRequests = aplicPendingRequests;
        this._notificationImplementation = notificationImpl;
    }

    public async getNotificationsWithPlants(): Promise<Result<NotificationTrigger[]>> {
        try {
            const notificationTriggers = await this.repository.select({
                relations: ["plant"],
            });

            return Result.Ok(notificationTriggers);
        }
        catch (error) {
            return Result.Fail(error.message);
        }
    }

    public async delete(entidade: NotificationTrigger) {
        try {
            await this.repository.delete(entidade);

            for (const triggerId of entidade.triggersId) {
                this._notificationImplementation.deleteTriggerNotification(triggerId);
            }

            const pendingRequest = new PendingRequests();

            pendingRequest.DTO = JSON.stringify(entidade);
            pendingRequest.method = PendingMethod.DeleteNotificationTrigger;

            await this._aplicPendingRequests.save(pendingRequest);

            return Result.Ok(null);
        } catch (error) {
            return Result.Fail(error.message)
        }
    }

    public override async save(entidade: NotificationTrigger): Promise<Result<null>> {
        try {
            const bodyNotification = {
                title: "Heeey 🌱",
                body: `Está na hora de cuidar da sua ${entidade.plant?.name}!`,
            }

            const triggersId = await this._notificationImplementation.createTriggerNotification(bodyNotification, {
                days: entidade.weekDay,
                hours: parseInt(entidade.time.split(':')[0]),
                minutes: parseInt(entidade.time.split(':')[1]),
            });

            entidade.triggersId = triggersId;

            const validateResult = ValidateNotificationTriggerUseCase.validate({
                id: entidade.id,
                plantId: entidade.plantId,
                time: entidade.time,
                triggersId: entidade.triggersId,
                weekDay: entidade.weekDay
            });

            if (!validateResult.Success) {
                throw new Error(validateResult.Message);
            }

            await super.save(entidade);

            const pendingRequest = new PendingRequests();

            pendingRequest.DTO = JSON.stringify(entidade);
            pendingRequest.method = PendingMethod.CreateNotificationTrigger;

            await this._aplicPendingRequests.save(pendingRequest);

            return Result.Ok(null);
        } catch (error) {
            return Result.Fail(error.message)
        }
    }
}