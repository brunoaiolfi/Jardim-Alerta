import { IDatabaseRepositoryImplementation, IFindOptions, IEntity } from "../../../infra/implementations/database/repository/DatabaseRepository";

export interface IRepBase<T> {
    select(options?: IFindOptions<T>): Promise<T[]>;
    insert(model: IEntity): Promise<void>;
}

export class RepBase<T extends IEntity> implements IRepBase<T> {
    private readonly _db: IDatabaseRepositoryImplementation<T>;

    constructor(db: IDatabaseRepositoryImplementation<T>) {
        this._db = db;
    }

    public async select(options?: IFindOptions<T>): Promise<T[]> {
        return await this._db.select(options);
    }

    public async insert(model: T): Promise<void> {
        await this._db.insert(model);
    }
}