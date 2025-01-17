import "reflect-metadata"
import { DataSource } from "typeorm"
import { Environments } from "../entities/environments/Environments"
import { Environments1737122917168 } from "../migrations/1737122917168-Environments"

export const AppDataSource = new DataSource({
    type: "react-native",
    database: "JardimAlerta.db3",
    location: "default",
    entities: [Environments],
    migrationsRun: true,
    migrations: [
        Environments1737122917168
    ],
    synchronize: false,
    logging: false,
})