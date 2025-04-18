import { Plants } from "../../../infra/database/entities/Plants";
import { IRepPlants } from "../../../infra/database/repositories/plants/RepPlants";
import { AplicBase } from "../base/AplicBase";

export class AplicPlants extends AplicBase<Plants> {
    constructor(repPlants: IRepPlants) {
        super(repPlants);
    }
}