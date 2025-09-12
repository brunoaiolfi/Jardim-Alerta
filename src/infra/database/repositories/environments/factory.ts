import { RepEnvironments } from "./RepEnvironments";
import { Environments } from "../../entities/Environments";
import { getDatabaseContext } from "../../context/factory";
import { IRepEnvironments } from "./IRepEnvironments";

export function getRepEnvironments() : IRepEnvironments {
    const repository = getDatabaseContext().getRepository(Environments)
    return new RepEnvironments(repository);
}