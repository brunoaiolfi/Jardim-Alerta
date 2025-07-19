import { DatabaseContext } from "./DatabaseContext";
import { AppDataSource } from "../DataSource/DataSource";
import { IDatabaseContext } from "./IDatabaseContext";

export function getDatabaseContext() : IDatabaseContext {
    return DatabaseContext.getInstance(AppDataSource);
}