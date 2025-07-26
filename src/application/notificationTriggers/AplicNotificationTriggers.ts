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

    public override async save(entidade: NotificationTrigger): Promise<Result<null>> {
        try {
            const validateResult = ValidateNotificationTriggerUseCase.validate({
                id: entidade.id,
                plantId: entidade.plantId,
                time: entidade.time,
                weekDay: entidade.weekDay,
            });

            if (!validateResult.Success) return Result.Fail(validateResult.Message);

            await this._createAndAttachNotificationTrigger(entidade);

            await super.save(entidade);

            await this._createPendingRequestsForSave(entidade);

            return Result.Ok(null);
        } catch (error) {
            return Result.Fail(error.message);
        }
    }

    public async delete(entidade: NotificationTrigger): Promise<Result<null>> {
        try {
            await this.repository.delete(entidade);

            await this._deleteNotificationTriggers(entidade.triggersId);

            await this._createPendingRequestsForDelete(entidade);

            return Result.Ok(null);
        } catch (error) {
            return Result.Fail(error.message);
        }
    }


    private async _createAndAttachNotificationTrigger(entidade: NotificationTrigger): Promise<void> {
        const bodyNotification = {
            title: "Heeey 🌱",
            body: `Está na hora de cuidar da sua ${entidade.plant?.name}!`,
        };

        const [hours, minutes] = entidade.time.split(':').map(Number);

        const triggersId = await this._notificationImplementation.createTriggerNotification(bodyNotification, {
            days: entidade.weekDay,
            hours,
            minutes,
        });

        entidade.triggersId = triggersId;
    }

    private async _createPendingRequestsForSave(entidade: NotificationTrigger): Promise<void> {
        // Pending para NotificationTrigger
        const pendingRequestCreateNT = new PendingRequests();
        pendingRequestCreateNT.DTO = JSON.stringify(entidade);
        pendingRequestCreateNT.method = PendingMethod.CreateNotificationTrigger;
        await this._aplicPendingRequests.save(pendingRequestCreateNT);

        // Pending para Plant
        if (entidade.plant) {
            const plant = entidade.plant; // guarda a planta antes
            delete entidade.plant;        // remove para evitar ciclo

            plant.notificationTriggers = plant.notificationTriggers
                ? [...plant.notificationTriggers, entidade]
                : [entidade];

            const pendingRequestUpdatePlant = new PendingRequests();
            pendingRequestUpdatePlant.DTO = JSON.stringify(plant);
            pendingRequestUpdatePlant.method = PendingMethod.EditPlant;
            await this._aplicPendingRequests.save(pendingRequestUpdatePlant);
        }
    }

    private async _deleteNotificationTriggers(triggersId: string[]): Promise<void> {
        for (const id of triggersId) {
            await this._notificationImplementation.deleteTriggerNotification(id);
        }
    }

    private async _createPendingRequestsForDelete(entidade: NotificationTrigger): Promise<void> {
        // Pending para exclusão da NotificationTrigger
        const pendingRequestDeleteNT = new PendingRequests();
        pendingRequestDeleteNT.DTO = JSON.stringify(entidade);
        pendingRequestDeleteNT.method = PendingMethod.DeleteNotificationTrigger;
        await this._aplicPendingRequests.save(pendingRequestDeleteNT);

        // Pending para atualizar Plant (removendo trigger)
        if (entidade.plant) {
            entidade.plant.notificationTriggers = entidade.plant?.notificationTriggers?.filter(n => n.id !== entidade.id);

            const pendingRequestUpdatePlant = new PendingRequests();
            pendingRequestUpdatePlant.DTO = JSON.stringify(entidade.plant);
            pendingRequestUpdatePlant.method = PendingMethod.EditPlant;
            await this._aplicPendingRequests.save(pendingRequestUpdatePlant);
        }
    }

}