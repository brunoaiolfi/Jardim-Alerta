import { getRepPlants } from "../../infra/database/repositories/plants/factory";
import { AplicPlants } from "./AplicPlants";
import { IAplicPlants } from "./IAplicPlants";

export function getAplicPlants() : IAplicPlants {
    const repo = getRepPlants();
    return new AplicPlants(repo);
}