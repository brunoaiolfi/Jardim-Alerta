import { Environments } from "../../../infra/database/entities/Environments";
import { FactoryDatabaseRepositoryImplementation } from "../../../infra/implementations/database/repository/factory";
import { RepEnvironments } from "./RepEnvironments";
import { getDatabaseContextImplementation } from "../../../infra/implementations/database/context/factory";

export function getRepEnvironments() {
    const dbContext = getDatabaseContextImplementation();
    const repository = dbContext.getRepository(Environments)
    const _db = FactoryDatabaseRepositoryImplementation.getDatabaseRepositoryImplementation<Environments>(repository);

    return new RepEnvironments(_db);
}