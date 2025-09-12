import { BaseEntity, FindManyOptions } from "typeorm";

export interface IFindOptions<T> extends FindManyOptions<T> { }
export interface IEntity extends BaseEntity { }

export interface IRepBase<T> {
    select(options?: IFindOptions<T>): Promise<T[]>;
    insert(model: IEntity): Promise<T>;
    delete(model: IEntity): Promise<void>;
}
