import { Environments } from "../../infra/database/entities/Environments";
import { IRepEnvironments } from "../../infra/database/repositories/environments/RepEnvironments";
import { IEntity } from "../../infra/implementations/database/DAO/DAO";
import { AplicBase } from "../base/AplicBase";
import { IAplicEnvironments } from "./IAplicEnvironments";

export class AplicEnvironments extends AplicBase<Environments> implements IAplicEnvironments {
    constructor(repEnvironments: IRepEnvironments) {
        super(repEnvironments);
    }

    public override async save(model: IEntity) {
        await this.repository.insert(model);
    }
}