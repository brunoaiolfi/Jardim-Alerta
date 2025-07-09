import { Plants } from "../../../../infra/database/entities/Plants";

export interface ICardPlants {
    plant: Plants,
    onSelectPlant: (plant: Plants) => void
}