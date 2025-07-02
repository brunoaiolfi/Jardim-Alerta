import { Repository } from "typeorm";
import { IDAOImplementation, IEntity, IFindOptions } from "./IDAO";

export class DAOImplementation<T extends IEntity> implements IDAOImplementation<T> {
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
