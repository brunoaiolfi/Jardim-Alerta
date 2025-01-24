import { DatabaseRepositoryImplementation, IDatabaseRepositoryImplementation, IFindOptions, IModel } from "../../../infra/implementations/database/repository/DatabaseRepository";

export interface IRepBase<T> {
    select(options?: IFindOptions<T>): Promise<T[]>;
    insert(model: IModel): Promise<void>;
}

export class RepBase<T extends IModel> implements IRepBase<T> {
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