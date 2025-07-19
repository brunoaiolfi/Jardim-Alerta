import { Repository } from "typeorm";
import { DAO } from "./DAO";
import { IDAO, IEntity } from "./IDAO";

export function getDAO<T extends IEntity>(repository: Repository<T>) : IDAO<T> {
    return new DAO<T>(repository);
}