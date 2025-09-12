import "reflect-metadata"
import { DataSource } from "typeorm"
import { Environments } from "../entities/Environments"
import { CreateEnvironments1737719894845 } from "../migrations/1737719894845-CreateEnvironments"
import { CreatePlants1737719894846 } from "../migrations/1737719894846-CreatePlants"
import { Plants } from "../entities/Plants"
import { CreatePlantsEnvironmentsRelation1737719894847 } from "../migrations/1737719894847-CreatePlantsEnvironmentsRelation"
import { NotificationTrigger } from "../entities/NotificationTrigger"
import { CreateNotificationTriggerPlantRelation1737719894848 } from "../migrations/1737719894848-CreateNotificationTriggerPlantRelation"
import { PendingRequests } from "../entities/PendingRequests"
import { CreatePendingRequests1737719894849 } from "../migrations/1737719894849-CreatePendingRequests"

export const AppDataSource = new DataSource({
    type: "react-native",
    database: "JardimAlerta.db3",
    location: "default",
    entities: [Environments, Plants, NotificationTrigger, PendingRequests],
    synchronize: false,
    migrations: [CreateEnvironments1737719894845, CreatePlants1737719894846, CreatePlantsEnvironmentsRelation1737719894847, CreateNotificationTriggerPlantRelation1737719894848, CreatePendingRequests1737719894849],
    migrationsRun: true
})