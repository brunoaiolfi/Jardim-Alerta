import { EnvironmentsDTO } from "../../../../apis/environments/DTOs/EnvironmentsDTO";
import { BaseFirebaseStore } from "../base/BaseFirebaseStore";
import { IEnvironmentsFirebaseStore } from "./IEnvironmentsFirebaseStore";

export class EnvironmentsFirebaseStore extends BaseFirebaseStore<EnvironmentsDTO> implements IEnvironmentsFirebaseStore {
    constructor() {
        super("environments");
    }
}