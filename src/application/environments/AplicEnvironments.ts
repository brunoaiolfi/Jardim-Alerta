import { Environments } from "../../infra/database/entities/Environments";
import { IRepEnvironments } from "../../infra/database/repositories/environments/IRepEnvironments";
import { AplicBase } from "../base/AplicBase";
import { IAplicEnvironments } from "./IAplicEnvironments";

export class AplicEnvironments extends AplicBase<Environments> implements IAplicEnvironments {
    constructor(repEnvironments: IRepEnvironments) {
        super(repEnvironments);
    }
}