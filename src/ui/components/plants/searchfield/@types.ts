import { Plants } from "../../../../infra/database/entities/Plants";

export type PlantSearchfieldProps = {
    IsOpen: boolean

    OnClose: () => void;
    OnSelected: (plant: Plants) => void;
}