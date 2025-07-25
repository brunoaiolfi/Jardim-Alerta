import { PlantsDTO } from "../DTOs/plantsDTO";

export interface IServPlants {
    createPlant(dto: PlantsDTO): Promise<PlantsDTO>;
    getPlants(userId: string): Promise<PlantsDTO[]>;
    updatePlant(id: string, dto: PlantsDTO): Promise<PlantsDTO>;
    deletePlant(id: string): Promise<void>;
}