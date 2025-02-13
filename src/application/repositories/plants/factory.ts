import { Plants } from "../../../infra/database/entities/Plants";
import { getDatabaseContextImplementation } from "../../../infra/implementations/database/context/factory";
import {  getDatabaseRepositoryImplementation } from "../../../infra/implementations/database/repository/factory";
import { RepPlants } from "./RepPlants";

export function getRepPlants() {
    const repository = getDatabaseContextImplementation().getRepository(Plants);
    const _db = getDatabaseRepositoryImplementation<Plants>(repository);
    return new RepPlants(_db);
}