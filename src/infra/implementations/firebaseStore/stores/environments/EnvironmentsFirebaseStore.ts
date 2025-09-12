import { EnvironmentsDTO } from "../../../../apis/environments/DTOs/EnvironmentsDTO";
import { BaseFirebaseStoreImplementation } from "../base/BaseFirebaseStore";
import { IEnvironmentsFirebaseStore } from "./IEnvironmentsFirebaseStore";

export class EnvironmentsFirebaseStore extends BaseFirebaseStoreImplementation<EnvironmentsDTO> implements IEnvironmentsFirebaseStore {
    constructor() {
        super("Environments");
    }
}