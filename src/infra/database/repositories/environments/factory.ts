import { RepEnvironments } from "./RepEnvironments";
import { Environments } from "../../entities/Environments";
import { getDAO } from "../../DAO/factory";
import { getDatabaseContext } from "../../context/factory";
import { IRepEnvironments } from "./IRepEnvironments";

export function getRepEnvironments() : IRepEnvironments {
    const repository = getDatabaseContext().getRepository(Environments)
    const _db = getDAO<Environments>(repository);

    return new RepEnvironments(_db);
}