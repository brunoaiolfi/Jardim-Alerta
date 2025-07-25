import { EnvironmentsDTO } from "../../../../apis/environments/DTOs/EnvironmentsDTO";
import { IBaseFirebaseStore } from "../base/IBaseFirebaseStore";

export interface IEnvironmentsFirebaseStore extends IBaseFirebaseStore<EnvironmentsDTO> { }