import { Result } from "../../domain/result/model/Result";
import { IRepBase } from "../../infra/database/repositories/base/IRepBase";
import { IEntity, IFindOptions } from "../../infra/implementations/database/DAO/IDAO";
import { IAplicBase } from "./IAplicBase";

export class AplicBase<T> implements IAplicBase<T> {
    protected readonly repository: IRepBase<T>;

    constructor(repository: IRepBase<T>) {
        this.repository = repository;
    }

    public async get(options?: IFindOptions<T>): Promise<Result<T[]>> {
        try {
            const content = await this.repository.select(options);
            return Result.Ok(content)
        } catch (e) {
            return Result.Fail(e.message);
        }
    }

    public async save(entidade: IEntity): Promise<Result<null>> {
        try {
            await this.repository.insert(entidade);
            return Result.Ok(null);
        } catch (e) {
            return Result.Fail(e.message);
        }
    }

    public async delete(entidade: IEntity): Promise<Result<null>> {
        try {
            await this.repository.delete(entidade);
            return Result.Ok(null);
        } catch (e) {
            return Result.Fail(e.message);
        }
    }
}