import { Repository } from "typeorm";
import { Environments } from "../../../database/entities/Environments";
import { DatabaseRepositoryImplementation, IModel } from "./DatabaseRepository";

export class FactoryDatabaseRepositoryImplementation {
    public static getDatabaseRepositoryImplementation<T extends IModel>(repository: Repository<T>) {
        return new DatabaseRepositoryImplementation<T>(repository);
    }
        
}