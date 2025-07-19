import { DataSource, EntityTarget, Repository } from "typeorm";
import { IDatabaseContext } from "./IDatabaseContext";

export class DatabaseContext implements IDatabaseContext {
    private static instance: DatabaseContext;
    private readonly _dataSource: DataSource;

    private constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
    }

    public static getInstance(dataSource: DataSource): DatabaseContext {
        if (!DatabaseContext.instance) {
            DatabaseContext.instance = new DatabaseContext(dataSource);
        }
        return DatabaseContext.instance;
    }

    async initialize(): Promise<DataSource> {
        if (!this._dataSource.isInitialized) {
            await this._dataSource.initialize();
        }
        return this._dataSource;
    }

    getRepository(entityTarget: EntityTarget<any>): Repository<any> {
        return this._dataSource.getRepository(entityTarget);
    }
}
