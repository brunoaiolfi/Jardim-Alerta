import { PlantsDTO } from '../../../../apis/plants/DTOs/PlantsDTO';
import { BaseFirebaseStoreImplementation } from '../base/BaseFirebaseStore';
import { IPlantsFirebaseStore } from './IPlantsFirebaseStore';

export class PlantsFirebaseStore extends BaseFirebaseStoreImplementation<PlantsDTO> implements IPlantsFirebaseStore {
    constructor() {
        super("Plants");
    }
}