export type PlantsDTO = {
    id: string;
    name: string;
    about: string;
    imageUri: string;
    environments: number[];
    notificationTriggers: number[]
}