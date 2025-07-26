import { Result } from "../../domain/result/model/Result";
import { IEntity, IFindOptions } from "../../infra/database/repositories/base/IRepBase";

export interface IAplicBase<T> {
    get: (options?: IFindOptions<T>) => Promise<Result<T[]>>;
    save: (entidade: IEntity) => Promise<Result<T>>;
    delete: (entidade: IEntity) => Promise<Result<null>>;
}