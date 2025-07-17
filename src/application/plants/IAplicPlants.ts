import { Result } from "../../domain/result/model/Result";
import { Plants } from "../../infra/database/entities/Plants";
import { IAplicBase } from "../base/IAplicBase";

export interface IAplicPlants extends IAplicBase<Plants> {
    getByEnvironments(environmentId: number): Promise<Result<Plants[]>>
}