import { BaseEntity, FindManyOptions, Repository } from "typeorm";

export interface IFindOptions<T> extends FindManyOptions<T> {}
export interface IModel extends BaseEntity {}
export interface IDatabaseRepositoryImplementation<T> {
    select: (options?: IFindOptions<T>) => Promise<T[]>;
    insert: (model: T) => Promise<void>;
}

export class DatabaseRepositoryImplementation<T extends IModel> implements IDatabaseRepositoryImplementation<T>{
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
}
