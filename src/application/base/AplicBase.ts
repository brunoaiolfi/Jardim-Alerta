import { IRepBase } from "../../infra/database/repositories/base/IRepBase";
import { IEntity, IFindOptions } from "../../infra/implementations/database/DAO/IDAO";
import { IAplicBase } from "./IAplicBase";

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