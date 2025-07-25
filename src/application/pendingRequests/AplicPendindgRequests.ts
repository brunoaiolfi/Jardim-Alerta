import { Result } from "../../domain/result/model/Result";
import { PendingMethod, PendingRequests } from "../../infra/database/entities/PendingRequests";
import { Plants } from "../../infra/database/entities/Plants";
import { IRepPendingRequests } from "../../infra/database/repositories/pendingRequests/IRepPendingRequests";
import { AplicBase } from "../base/AplicBase";
import { IAplicPendingRequests } from "./IAplicPendingRequests";
import { IAplicAuth } from '../auth/IAplicAuth';
import { PlantsDTO } from '../../infra/apis/plants/DTOs/PlantsDTO';
import { IServPlants } from '../../infra/apis/plants/services/IServPlants';
import { NotificationTriggerDTO } from "../../infra/apis/notificationTriggers/DTOs/NotificationTriggerDTO";
import { IServNotificationTriggers } from "../../infra/apis/notificationTriggers/service/IServNotificationTriggers";

export class AplicPendingRequests extends AplicBase<PendingRequests> implements IAplicPendingRequests {


    private readonly _aplicAuth: IAplicAuth;
    private readonly _servPlants: IServPlants;
    private readonly _servNotificationTriggers: IServNotificationTriggers;

    constructor(repEnvironments: IRepPendingRequests, aplicAuth: IAplicAuth, servPlants: IServPlants, servNotificationTriggers: IServNotificationTriggers) {
        super(repEnvironments);
        this._aplicAuth = aplicAuth;
        this._servPlants = servPlants;
        this._servNotificationTriggers = servNotificationTriggers;
    }

    private readonly dictMethod = {
        [PendingMethod.CreatePlant]: (dto: any) => this.proccessCreatePlant(dto as Plants),
        [PendingMethod.EditPlant]: (dto: any) => this.proccessEditPlant(dto as Plants),
        [PendingMethod.CreateNotificationTrigger]: (dto: any) => this.proccessCreateNotificationTrigger(dto),
        [PendingMethod.DeleteNotificationTrigger]: (dto: any) => this.proccessDeleteNotificationTrigger(dto)
    }

    public async SyncPendingRequests(): Promise<Result<void>> {
        try {
            const { Content: PendingRequests } = await this.get({
                order: {
                    createdAt: "ASC"
                }
            });

            if (!PendingRequests || PendingRequests.length === 0) return Result.Ok(null);

            for (const request of PendingRequests) {
                const result = await this.dictMethod[request.method](
                    JSON.parse(request.DTO)
                );

                if (!result.Success) break;

                await this.delete(request)
            }

            return Result.Ok(null);

        } catch (error) {
            return Result.Fail("Failed to synchronize pending requests: " + error.message);
        }
    }

    private async proccessCreatePlant(plant: Plants): Promise<Result<void>> {
        try {
            const resUser = await this._aplicAuth.getUser();

            if (!resUser?.Success || !resUser.Content) {
                return Result.Fail("Usuário não autenticado.");
            }

            const dto: PlantsDTO = {
                id: plant.id,
                name: plant.name,
                about: plant.about,
                environments: plant.environments.map(env => env.id),
                imageUri: plant.imageUri,
                notificationTriggers: plant?.notificationTriggers?.map(trigger => trigger.id) ?? [],
                userId: resUser.Content.id
            };

            await this._servPlants.createPlant(dto);
            return Result.Ok(null);
        } catch (error) {
            return Result.Fail(error.message);
        }
    }

    private async proccessEditPlant(plant: Plants): Promise<Result<void>> {
        try {
            const resUser = await this._aplicAuth.getUser();

            if (!resUser?.Success || !resUser.Content) {
                return Result.Fail("Usuário não autenticado.");
            }

            const dto: PlantsDTO = {
                id: plant.id,
                name: plant.name,
                about: plant.about,
                environments: plant.environments.map(env => env.id),
                imageUri: plant.imageUri,
                notificationTriggers: plant?.notificationTriggers?.map(trigger => trigger.id) ?? [],
                userId: resUser.Content.id
            };

            await this._servPlants.updatePlant(plant.id, dto);
            return Result.Ok(null);
        } catch (error) {
            return Result.Fail(error.message);
        }
    }

    private async proccessCreateNotificationTrigger(notificationTrigger: any): Promise<Result<void>> {
        try {
            const resUser = await this._aplicAuth.getUser();

            if (!resUser.Success || !resUser.Content?.id) {
                return Result.Fail("Usuário não autenticado.");
            }

            const dto: NotificationTriggerDTO = {
                id: notificationTrigger.id,
                plantId: notificationTrigger.plantId,
                time: notificationTrigger.time,
                weekDay: notificationTrigger.weekDay,
                triggersId: notificationTrigger.triggersId,
                userId: resUser.Content.id
            };

            await this._servNotificationTriggers.createTrigger(dto);

            return Result.Ok(null);
        } catch (error) {
            return Result.Fail(error.message);
        }
    }

    private async proccessDeleteNotificationTrigger(notificationTrigger: any): Promise<Result<void>> {
        try {
            const resUser = await this._aplicAuth.getUser();

            if (!resUser.Success || !resUser.Content?.id) {
                return Result.Fail("Usuário não autenticado.");
            }

            await this._servNotificationTriggers.deleteTrigger(notificationTrigger.id);

            return Result.Ok(null);
        } catch (error) {
            return Result.Fail(error.message);
        }
    }
}