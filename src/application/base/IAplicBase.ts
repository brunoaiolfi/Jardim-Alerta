import { Result } from "../../domain/result/model/Result";
import { IEntity, IFindOptions } from "../../infra/database/DAO/IDAO";

export interface IAplicBase<T> {
    get: (options?: IFindOptions<T>) => Promise<Result<T[]>>;
    save: (entidade: IEntity) => Promise<Result<null>>;
    delete: (entidade: IEntity) => Promise<Result<null>>;
}