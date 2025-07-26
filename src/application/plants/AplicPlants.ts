import { Result } from "../../domain/result/model/Result";
import { PendingMethod, PendingRequests } from "../../infra/database/entities/PendingRequests";
import { Plants } from "../../infra/database/entities/Plants";
import { IRepPlants } from "../../infra/database/repositories/plants/IRepPlants";
import { AplicBase } from "../base/AplicBase";
import { IAplicPendingRequests } from "../pendingRequests/IAplicPendingRequests";
import { IAplicPlants } from "./IAplicPlants";

export class AplicPlants extends AplicBase<Plants> implements IAplicPlants {
    private readonly _aplicPendingRequests: IAplicPendingRequests;

    constructor(repPlants: IRepPlants, aplicPendingRequests: IAplicPendingRequests, ) {
        super(repPlants);

        this._aplicPendingRequests = aplicPendingRequests;
    }

    public override async save(plant: Plants): Promise<Result<null>> {
        try {
            await this.repository.insert(plant);

            const pendingRequest = new PendingRequests();

            pendingRequest.DTO = JSON.stringify(plant);
            pendingRequest.method = plant.id ? PendingMethod.EditPlant : PendingMethod.CreatePlant;

            await this._aplicPendingRequests.save(pendingRequest)

            return Result.Ok(null);
        } catch (e) {
            return Result.Fail(e.message);
        }
    }

    public async getByEnvironments(environmentId: string): Promise<Result<Plants[]>> {
        try {
            if (!environmentId) {
                return Result.Fail("Por favor, informe o ambiente.");
            }

            const plants = await this.repository.select({
                relations: ["environments"],
                where: {
                    environments: {
                        id: environmentId
                    }
                }
            });

            return Result.Ok(plants);
        } catch (error) {
            return Result.Fail(error.message)
        }
    }

    public async getById(id: string): Promise<Result<Plants>> {
        try {
            if (!id) {
                return Result.Fail("Por favor, informe o id da planta.");
            }

            const plants = await this.repository.select({
                relations: ["environments", "notificationTriggers"],
                where: {
                    id: id
                }
            });

            if (!plants) {
                return Result.Fail("Planta não encontrada.");
            }

            return Result.Ok(plants[0]);
        } catch (error) {
            return Result.Fail(error.message);
        }
    }
}