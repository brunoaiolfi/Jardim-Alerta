import { getRepEnvironments } from "../../../infra/database/repositories/environments/factory";
import { AplicEnvironments } from "./AplicEnvironments";

export function getAplicEnvironments() {
    const repEnvironments = getRepEnvironments();
    return new AplicEnvironments(repEnvironments);
}