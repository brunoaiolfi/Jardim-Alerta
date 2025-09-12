import { DatabaseContext } from "./DatabaseContext";
import { AppDataSource } from "../dataSource/DataSource";
import { IDatabaseContext } from "./IDatabaseContext";

export function getDatabaseContext() : IDatabaseContext {
    return DatabaseContext.getInstance(AppDataSource);
}