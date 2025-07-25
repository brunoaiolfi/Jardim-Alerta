import { PlantsDTO } from '../../../../apis/plants/DTOs/PlantsDTO';
import { BaseFirebaseStore } from '../base/BaseFirebaseStore';
import { IPlantsFirebaseStore } from './IPlantsFirebaseStore';

export class PlantsFirebaseStore extends BaseFirebaseStore<PlantsDTO> implements IPlantsFirebaseStore {
    constructor() {
        super("plants");
    }
}