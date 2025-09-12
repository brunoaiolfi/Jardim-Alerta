import { EnvironmentsDTO } from "../DTOs/EnvironmentsDTO";

export interface IServEnvironments {
    createEnvironment(data: EnvironmentsDTO): Promise<EnvironmentsDTO>;
    getEnvironments(userId: string): Promise<EnvironmentsDTO[]>;
}