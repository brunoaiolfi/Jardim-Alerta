import { RepEnvironments } from "./RepEnvironments";
import { Environments } from "../../entities/Environments";
import { getDAOImplementation } from "../../../implementations/database/DAO/factory";
import { getDatabaseContextImplementation } from "../../../implementations/database/context/factory";
import { IRepEnvironments } from "./IRepEnvironments";

export function getRepEnvironments() : IRepEnvironments {
    const repository = getDatabaseContextImplementation().getRepository(Environments)
    const _db = getDAOImplementation<Environments>(repository);

    return new RepEnvironments(_db);
}