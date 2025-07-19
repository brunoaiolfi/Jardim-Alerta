
import { getDatabaseContext } from "../../context/factory";
import { getDAO } from "../../DAO/factory";
import { Plants } from "../../entities/Plants";
import { IRepPlants } from "./IRepPlants";
import { RepPlants } from "./RepPlants";

export function getRepPlants() : IRepPlants {
    const repository = getDatabaseContext().getRepository(Plants);
    const _db = getDAO<Plants>(repository);
    return new RepPlants(_db);
}