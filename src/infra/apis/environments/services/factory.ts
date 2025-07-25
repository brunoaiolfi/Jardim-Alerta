import { EnvironmentsFirebaseStore } from "../../../implementations/firebaseStore/stores/environments/EnvironmentsFirebaseStore";
import { IServEnvironments } from "./IServEnvironments";
import { ServEnvironments } from "./ServEnvironments";

export function getServEnvironments(): IServEnvironments {
    const environmentsStore = new EnvironmentsFirebaseStore();
    return new ServEnvironments(environmentsStore);
}