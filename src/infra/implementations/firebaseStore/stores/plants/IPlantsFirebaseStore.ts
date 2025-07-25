import { PlantsDTO } from "../../../../apis/plants/DTOs/PlantsDTO";
import { IBaseFirebaseStore } from "../base/IBaseFirebaseStore";

export interface IPlantsFirebaseStore extends IBaseFirebaseStore<PlantsDTO> { }