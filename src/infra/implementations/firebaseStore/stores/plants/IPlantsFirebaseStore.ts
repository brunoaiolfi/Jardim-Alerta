import { PlantsDTO } from "../../../../apis/plants/DTOs/PlantsDTO";
import { IBaseFirebaseStoreImplementation } from "../base/IBaseFirebaseStore";

export interface IPlantsFirebaseStore extends IBaseFirebaseStoreImplementation<PlantsDTO> { }