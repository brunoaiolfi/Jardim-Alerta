import { IEntity, IFindOptions } from "../../../implementations/database/DAO/IDAO";

export interface IRepBase<T> {
    select(options?: IFindOptions<T>): Promise<T[]>;
    insert(model: IEntity): Promise<void>;
    delete(model: IEntity): Promise<void>;
}
