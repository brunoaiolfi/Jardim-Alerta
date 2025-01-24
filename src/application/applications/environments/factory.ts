import { getRepEnvironments } from "../../repositories/environments/factory";
import { AplicEnvironments } from "./AplicEnvironments";

export function getAplicEnvironments() {
    const repEnvironments = getRepEnvironments();
    return new AplicEnvironments(repEnvironments);
}