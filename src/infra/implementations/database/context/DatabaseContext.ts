import { DataSource, EntityTarget, Repository } from "typeorm";
import { IDatabaseContext } from "./IDatabaseContext";

export class DatabaseContextImplementation implements IDatabaseContext {

    private readonly _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
    };

    async initialize(): Promise<DataSource> {
        return await this._dataSource.initialize();
    }

    getRepository(entityTarget: EntityTarget<any>): Repository<any> {
        return this._dataSource.getRepository(entityTarget);
    }
}
