
import { getDatabaseContextImplementation } from "../../../implementations/database/context/factory";
import { getDAOImplementation } from "../../../implementations/database/DAO/factory";
import { Plants } from "../../entities/Plants";
import { RepPlants } from "./RepPlants";

export function getRepPlants() {
    const repository = getDatabaseContextImplementation().getRepository(Plants);
    const _db = getDAOImplementation<Plants>(repository);
    return new RepPlants(_db);
}