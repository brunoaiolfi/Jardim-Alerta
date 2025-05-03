import { BaseEntity, FindManyOptions, Repository } from "typeorm";

export interface IFindOptions<T> extends FindManyOptions<T> {}
export interface IEntity extends BaseEntity {}
export interface IDAOImplementation<T> {
    select: (options?: IFindOptions<T>) => Promise<T[]>;
    insert: (model: T) => Promise<void>;
    delete: (model: T) => Promise<void>;
}

export class DAOImplementation<T extends IEntity> implements IDAOImplementation<T>{
    private readonly repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    public async select(options?: IFindOptions<T>): Promise<T[]> {
        return await this.repository.find(options);
    }

    public async insert(model: T): Promise<void> {
        await this.repository.save(model);
    }

    public async delete(model: T): Promise<void> {
        await this.repository.remove(model);
    }
}
