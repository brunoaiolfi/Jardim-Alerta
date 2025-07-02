import { Plant } from "../../../../../domain/plants/models/Plant";

export interface ICardPlants {
    plant: Plant,
    onSelectPlant: (id: number) => void
}