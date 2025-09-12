import { IPlantsFirebaseStore } from "./IPlantsFirebaseStore";
import { PlantsFirebaseStore } from "./PlantsFirebaseStore";

export function getPlantsFirebaseStore(): IPlantsFirebaseStore {
    return new PlantsFirebaseStore();
}