import { IEnvironmentsFirebaseStore } from "../../../implementations/firebaseStore/stores/environments/IEnvironmentsFirebaseStore";
import { EnvironmentsDTO } from "../DTOs/EnvironmentsDTO";
import { IServEnvironments } from "./IServEnvironments";

export class ServEnvironments implements IServEnvironments {

    public constructor(private environmentsStore: IEnvironmentsFirebaseStore) {}

    public async getEnvironments(userId: string): Promise<EnvironmentsDTO[]> {
        const environments = await this.environmentsStore.read(userId);
        return environments;
    }

    public async createEnvironment(data: EnvironmentsDTO): Promise<EnvironmentsDTO> {
        const environment = await this.environmentsStore.create(data);

        if (environment.id) {
            data.id = environment.id;
        }
        
        return data;
    }
}