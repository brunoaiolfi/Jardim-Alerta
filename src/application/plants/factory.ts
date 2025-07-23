import { getRepPlants } from "../../infra/database/repositories/plants/factory";
import { getPendingRequestsAplic } from "../pendingRequests/factory";
import { AplicPlants } from "./AplicPlants";
import { IAplicPlants } from "./IAplicPlants";

export function getAplicPlants() : IAplicPlants {
    const repo = getRepPlants();
    const pendingRequestsAplic = getPendingRequestsAplic();
    return new AplicPlants(repo, pendingRequestsAplic);
}