import { getRepEnvironments } from "../../infra/database/repositories/environments/factory";
import { AplicEnvironments } from "./AplicEnvironments";
import { IAplicEnvironments } from "./IAplicEnvironments";

export function getAplicEnvironments(): IAplicEnvironments {
    const repEnvironments = getRepEnvironments();
    return new AplicEnvironments(repEnvironments);
}