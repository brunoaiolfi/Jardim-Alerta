import { PlantsFirebaseStore } from "../../../implementations/firebaseStore/stores/plants/PlantsFirebaseStore";
import { ServPlants } from "./ServPlants";

export function getServPlants() {
    const plantsStore = new PlantsFirebaseStore();
    return new ServPlants(plantsStore);
}