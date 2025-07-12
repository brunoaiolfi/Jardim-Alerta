import { Result } from "../../domain/result/model/Result";
import { Plants } from "../../infra/database/entities/Plants";
import { IRepPlants } from "../../infra/database/repositories/plants/IRepPlants";
import { AplicBase } from "../base/AplicBase";
import { IAplicPlants } from "./IAplicPlants";

export class AplicPlants extends AplicBase<Plants> implements IAplicPlants {
    constructor(repPlants: IRepPlants) {
        super(repPlants);
    }

    public async getByEnvironments(environmentId: number): Promise<Result<Plants[]>> {
        try {
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
}