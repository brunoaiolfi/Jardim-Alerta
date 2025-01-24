import { IFindOptions, IEntity } from "../../../infra/implementations/database/repository/DatabaseRepository";
import { IRepBase } from "../../repositories/base/RepBase";

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
}