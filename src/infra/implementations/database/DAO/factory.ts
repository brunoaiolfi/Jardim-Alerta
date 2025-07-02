import { Repository } from "typeorm";
import { DAOImplementation } from "./DAO";
import { IDAOImplementation, IEntity } from "./IDAO";

export function getDAOImplementation<T extends IEntity>(repository: Repository<T>) : IDAOImplementation<T> {
    return new DAOImplementation<T>(repository);
}