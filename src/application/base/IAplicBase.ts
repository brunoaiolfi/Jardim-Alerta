import { IEntity, IFindOptions } from "../../infra/implementations/database/DAO/DAO";

export interface IAplicBase<T> {
    get: (options?: IFindOptions<T>) => Promise<T[]>;
    save: (model: IEntity) => Promise<void>;
    delete: (model: IEntity) => Promise<void>;
}