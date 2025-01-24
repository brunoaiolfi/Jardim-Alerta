import { DatabaseContextImplementation, IDatabaseImplementation } from "./DatabaseContext";
import { AppDataSource } from "../../../database";

let databaseContextImplementationInstance: IDatabaseImplementation | null = null;

export function getDatabaseContextImplementation() {
    if (!databaseContextImplementationInstance) {
        databaseContextImplementationInstance = new DatabaseContextImplementation(AppDataSource);
    }

    return databaseContextImplementationInstance;
}