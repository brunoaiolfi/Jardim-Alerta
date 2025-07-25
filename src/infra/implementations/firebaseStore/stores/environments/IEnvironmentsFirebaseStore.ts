import { EnvironmentsDTO } from "../../../../apis/environments/DTOs/EnvironmentsDTO";
import { IBaseFirebaseStoreImplementation } from "../base/IBaseFirebaseStore";

export interface IEnvironmentsFirebaseStore extends IBaseFirebaseStoreImplementation<EnvironmentsDTO> { }