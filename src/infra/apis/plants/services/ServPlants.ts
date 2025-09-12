import { IPlantsFirebaseStore } from '../../../implementations/firebaseStore/stores/plants/IPlantsFirebaseStore';
import { PlantsDTO } from '../DTOs/plantsDTO';
import { IServPlants } from './IServPlants';

export class ServPlants implements IServPlants {
    public constructor(private plantsStore: IPlantsFirebaseStore) { }

    public async getPlants(userId: string): Promise<PlantsDTO[]> {
        const plants = await this.plantsStore.read(userId);
        return plants;
    }

    public async createPlant(data: PlantsDTO): Promise<PlantsDTO> {
        const plant = await this.plantsStore.create(data);

        if (plant.id) {
            data.id = plant.id;
        }
        
        return data;
    }

    public async updatePlant(id: string, data: PlantsDTO): Promise<PlantsDTO> {
        await this.plantsStore.update(id, data);
        return data;
    }

    public async deletePlant(id: string): Promise<void> {
        await this.plantsStore.delete(id);
    }
}