import { IDAOImplementation, IFindOptions, IEntity } from './../../../implementations/database/DAO/DAO';

export interface IRepBase<T> {
    select(options?: IFindOptions<T>): Promise<T[]>;
    insert(model: IEntity): Promise<void>;
    delete(model: IEntity): Promise<void>;
}

export class RepBase<T extends IEntity> implements IRepBase<T> {
    private readonly _db: IDAOImplementation<T>;

    constructor(db: IDAOImplementation<T>) {
        this._db = db;
    }

    public async select(options?: IFindOptions<T>): Promise<T[]> {
        return await this._db.select(options);
    }

    public async insert(model: T): Promise<void> {
        await this._db.insert(model);
    }

    public async delete(model: T): Promise<void> {
        await this._db.delete(model);
    }
}