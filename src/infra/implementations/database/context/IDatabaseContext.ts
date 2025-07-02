import { DataSource, EntityTarget, Repository } from "typeorm";

export interface IDatabaseContext {
    initialize: () => Promise<DataSource>;
    getRepository: (entityTarget: EntityTarget<any>) => Repository<any>;
}
