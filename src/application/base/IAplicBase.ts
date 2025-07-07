import { IEntity, IFindOptions } from "../../infra/implementations/database/DAO/IDAO";

export interface IAplicBase<T> {
    get: (options?: IFindOptions<T>) => Promise<T[]>;
    save: (entidade: IEntity) => Promise<void>;
    delete: (entidade: IEntity) => Promise<void>;
}