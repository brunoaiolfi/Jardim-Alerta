import { IAplicPlants } from './../plants/IAplicPlants';
import { Result } from "../../domain/result/model/Result";
import { PendingMethod, PendingRequests } from "../../infra/database/entities/PendingRequests";
import { Plants } from "../../infra/database/entities/Plants";
import { IRepPendingRequests } from "../../infra/database/repositories/pendingRequests/IRepPendingRequests";
import { AplicBase } from "../base/AplicBase";
import { IAplicPendingRequests } from "./IAplicPendingRequests";
import { IAplicNotificationTriggers } from '../notificationTriggers/IAplicNotificationTriggers';

export class AplicPendingRequests extends AplicBase<PendingRequests> implements IAplicPendingRequests {

    private readonly _aplicPlants: IAplicPlants;
    private readonly _aplicNotificationTriggers: IAplicNotificationTriggers;

    constructor(repEnvironments: IRepPendingRequests, aplicPlants: IAplicPlants, aplicNotificationTriggers: IAplicNotificationTriggers) {
        super(repEnvironments);

        this._aplicPlants = aplicPlants;
        this._aplicNotificationTriggers = aplicNotificationTriggers;
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
                const result = await this.dictMethod[request.method](request.DTO);

                if (!result.Success) break;

                await this.delete(request)
            }

            return Result.Ok(null);

        } catch (error) {
            return Result.Fail("Failed to synchronize pending requests: " + error.message);
        }
    }

    private async proccessCreatePlant(dto: Plants): Promise<Result<null>> {
        console.log("proccessCreatePlant");
        return Result.Ok(null);
    }

    private async proccessEditPlant(dto: Plants): Promise<Result<null>> {
        console.log("proccessEditPlant");
        return Result.Ok(null);
    }

    private async proccessCreateNotificationTrigger(dto: any): Promise<Result<null>> {
        console.log("proccessCreateNotificationTrigger");
        return Result.Ok(null);
    }

    private async proccessDeleteNotificationTrigger(dto: any): Promise<Result<null>> {
        console.log("proccessDeleteNotificationTrigger");
        return Result.Ok(null);
    }
}