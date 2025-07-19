import { BaseEntity, FindManyOptions } from "typeorm";

export interface IFindOptions<T> extends FindManyOptions<T> { }
export interface IEntity extends BaseEntity { }
export interface IDAO<T> {
    select: (options?: IFindOptions<T>) => Promise<T[]>;
    insert: (model: T) => Promise<void>;
    delete: (model: T) => Promise<void>;
}
