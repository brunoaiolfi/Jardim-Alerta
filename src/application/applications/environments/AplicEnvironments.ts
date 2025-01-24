import { Environments } from "../../../infra/database/entities/Environments";
import { IEntity } from "../../../infra/implementations/database/repository/DatabaseRepository";
import { IRepEnvironments } from "../../repositories/environments/RepEnvironments";
import { AplicBase } from "../base/AplicBase";

export class AplicEnvironments extends AplicBase<Environments>{
    constructor(repEnvironments: IRepEnvironments) {
        super(repEnvironments);
    }

    public override async save(model: IEntity) {
        await this.repository.insert(model);
    }
}