import { Repository } from "typeorm";
import { DatabaseRepositoryImplementation, IEntity } from "./DatabaseRepository";

export class FactoryDatabaseRepositoryImplementation {
    public static getDatabaseRepositoryImplementation<T extends IEntity>(repository: Repository<T>) {
        return new DatabaseRepositoryImplementation<T>(repository);
    }
        
}