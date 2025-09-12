
import { getDatabaseContext } from "../../context/factory";
import { Plants } from "../../entities/Plants";
import { IRepPlants } from "./IRepPlants";
import { RepPlants } from "./RepPlants";

export function getRepPlants() : IRepPlants {
    const repository = getDatabaseContext().getRepository(Plants);
    return new RepPlants(repository);
}