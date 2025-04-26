import "reflect-metadata"
import { DataSource } from "typeorm"
import { Environments } from "./entities/Environments"
import { CreateEnvironments1737719894845 } from "./migrations/1737719894845-CreateEnvironments"
import { CreatePlantsAndWaterFrequency1737719894846 } from "./migrations/1737719894846-CreatePlantsAndWaterFrequency"
import { Plants } from "./entities/Plants"
import { WaterFrequency } from "./entities/WaterFrequency"
import { CreatePlantsEnvironmentsRelation1737719894847 } from "./migrations/1737719894847-CreatePlantsEnvironmentsRelation"
import { NotificationTrigger } from "./entities/NotificationTrigger"
import { CreateNotificationTriggerPlantRelation1737719894848 } from "./migrations/1737719894848-CreateNotificationTriggerPlantRelation"

export const AppDataSource = new DataSource({
    type: "react-native",
    database: "JardimAlerta.db3",
    location: "default",
    entities: [Environments, Plants, WaterFrequency, NotificationTrigger],
    synchronize: false,
    migrations: [CreateEnvironments1737719894845, CreatePlantsAndWaterFrequency1737719894846, CreatePlantsEnvironmentsRelation1737719894847, CreateNotificationTriggerPlantRelation1737719894848],
    migrationsRun: true
})