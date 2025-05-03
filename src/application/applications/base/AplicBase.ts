import { IRepBase } from "../../../infra/database/repositories/base/RepBase";
import { IFindOptions, IEntity } from "../../../infra/implementations/database/DAO/DAO";

interface IAplicBase<T> {
    get: (options?: IFindOptions<T>) => Promise<T[]>;
    save: (model: IEntity) => Promise<void>;
}

export class AplicBase<T> implements IAplicBase<T> {
    protected readonly repository: IRepBase<T>;

    constructor(repository: IRepBase<T>) {
        this.repository = repository;
    }

    public async get(options?: IFindOptions<T>): Promise<T[]> {
        return await this.repository.select(options);
    }

    public async save(model: IEntity): Promise<void> {
        await this.repository.insert(model);
    }

    public async delete(model: IEntity): Promise<void> {
        await this.repository.delete(model);
    }
}