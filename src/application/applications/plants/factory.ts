import { getRepPlants } from "../../repositories/plants/factory";
import { AplicPlants } from "./AplicPlants";

export function getAplicPlants() {
    const repo = getRepPlants();
    return new AplicPlants(repo);
}