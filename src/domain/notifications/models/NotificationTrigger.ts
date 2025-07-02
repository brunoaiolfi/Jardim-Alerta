import { Plant } from "../../plants/models/Plant";

export class NotificationTrigger {
    id: string;
    weekDay: number[];
    triggersId: string[];
    time: string;
    plant: Plant;
    plantId: number;
}