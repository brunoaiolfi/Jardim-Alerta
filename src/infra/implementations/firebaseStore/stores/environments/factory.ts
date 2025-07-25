import { EnvironmentsFirebaseStore } from "./EnvironmentsFirebaseStore";
import { IEnvironmentsFirebaseStore } from "./IEnvironmentsFirebaseStore";

export function getEnvironmentsFirebaseStore(): IEnvironmentsFirebaseStore {
    return new EnvironmentsFirebaseStore();
}