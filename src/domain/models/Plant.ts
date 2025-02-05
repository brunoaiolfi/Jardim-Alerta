import { Environment } from "./Environment";
import { WaterFrequency } from "./WaterFrequency";

export class Plant {
    id: number;
    name: string;
    about: string;
    waterTips: string;
    frequencyTimes: number;
    water_frequency: WaterFrequency;
    environments?: Environment[];
}