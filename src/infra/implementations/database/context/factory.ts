import { DatabaseContextImplementation } from "./DatabaseContext";
import { AppDataSource } from "../../../database";
import { IDatabaseContext } from "./IDatabaseContext";

export function getDatabaseContextImplementation() : IDatabaseContext {
    let databaseContextImplementationInstance: IDatabaseContext | null = null;
    
    if (!databaseContextImplementationInstance) {
        databaseContextImplementationInstance = new DatabaseContextImplementation(AppDataSource);
    }

    return databaseContextImplementationInstance;
}