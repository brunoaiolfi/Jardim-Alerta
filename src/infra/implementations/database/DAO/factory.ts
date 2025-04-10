import { Repository } from "typeorm";
import { DAOImplementation, IEntity } from "./DAO";

export function getDAOImplementation<T extends IEntity>(repository: Repository<T>) {
    return new DAOImplementation<T>(repository);
}