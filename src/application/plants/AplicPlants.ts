import { Plants } from "../../infra/database/entities/Plants";
import { IRepPlants } from "../../infra/database/repositories/plants/RepPlants";
import { AplicBase } from "../base/AplicBase";
import { IAplicPlants } from "./IAplicPlants";

export class AplicPlants extends AplicBase<Plants> implements IAplicPlants {
    constructor(repPlants: IRepPlants) {
        super(repPlants);
    }
}