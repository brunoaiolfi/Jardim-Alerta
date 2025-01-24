import "reflect-metadata"
import { DataSource } from "typeorm"
import { Environments } from "./entities/Environments"
import { CreateEnvironments1737719894845 } from "./migrations/1737719894845-CreateEnvironments"

export const AppDataSource = new DataSource({
    type: "react-native",
    database: "JardimAlerta.db3",
    location: "default",
    entities: [Environments],
    synchronize: false,
    migrations: [CreateEnvironments1737719894845],
    migrationsRun: true
})