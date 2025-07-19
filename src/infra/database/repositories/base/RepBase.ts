import { IDAO, IEntity, IFindOptions } from '../../DAO/IDAO';
import { IRepBase } from './IRepBase';

export class RepBase<T extends IEntity> implements IRepBase<T> {
    private readonly _db: IDAO<T>;

    constructor(db: IDAO<T>) {
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