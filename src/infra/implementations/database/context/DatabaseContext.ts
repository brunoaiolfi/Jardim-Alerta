import { DataSource, EntityTarget, Repository } from "typeorm";

export interface IDatabaseImplementation {
    initialize: () => Promise<DataSource>;
    getRepository: (entityTarget: EntityTarget<any>) => Repository<any>;
}


export class DatabaseContextImplementation implements IDatabaseImplementation {

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
