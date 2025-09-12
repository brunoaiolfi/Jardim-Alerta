import { Repository } from 'typeorm';
import { IEntity, IFindOptions, IRepBase } from './IRepBase';

export class RepBase<T extends IEntity> implements IRepBase<T> {
    private readonly repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    public async select(options?: IFindOptions<T>): Promise<T[]> {
        return await this.repository.find(options);
    }

    public async insert(model: T): Promise<T> {
       return await this.repository.save(model);
    }

    public async delete(model: T): Promise<void> {
        await this.repository.remove(model);
    }
}