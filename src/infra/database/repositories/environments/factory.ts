import { RepEnvironments } from "./RepEnvironments";
import { Environments } from "../../entities/Environments";
import { getDAOImplementation } from "../../../implementations/database/DAO/factory";
import { getDatabaseContextImplementation } from "../../../implementations/database/context/factory";

export function getRepEnvironments() {
    const repository = getDatabaseContextImplementation().getRepository(Environments)
    const _db = getDAOImplementation<Environments>(repository);

    return new RepEnvironments(_db);
}