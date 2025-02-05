import { Plant } from "../../../../domain/models/Plant";

export interface ICardPlants {
    plant: Plant,
    onSelectPlant: (id: number) => void
}