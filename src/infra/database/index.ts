import "reflect-metadata"
import { DataSource } from "typeorm"
import { Environments } from "./entities/Environments"
import { CreateEnvironments1737719894845 } from "./migrations/1737719894845-CreateEnvironments"
import { CreatePlantsAndWaterFrequency1737719894846 } from "./migrations/1737719894846-CreatePlantsAndWaterFrequency"
import { Plants } from "./entities/Plants"
import { WaterFrequency } from "./entities/WaterFrequency"

export const AppDataSource = new DataSource({
    type: "react-native",
    database: "JardimAlerta.db3",
    location: "default",
    entities: [Environments, Plants, WaterFrequency],
    synchronize: false,
    migrations: [CreateEnvironments1737719894845, CreatePlantsAndWaterFrequency1737719894846],
    migrationsRun: true
})