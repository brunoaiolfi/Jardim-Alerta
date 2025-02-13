import { Environments } from "../../../infra/database/entities/Environments";
import { getDatabaseRepositoryImplementation } from "../../../infra/implementations/database/repository/factory";
import { RepEnvironments } from "./RepEnvironments";
import { getDatabaseContextImplementation } from "../../../infra/implementations/database/context/factory";

export function getRepEnvironments() {
    const repository = getDatabaseContextImplementation().getRepository(Environments)
    const _db = getDatabaseRepositoryImplementation<Environments>(repository);

    return new RepEnvironments(_db);
}