import { Plants } from "../../../infra/database/entities/Plants";
import { IRepBase, RepBase } from "../base/RepBase";

export interface IRepPlants extends IRepBase<Plants> { }

export class RepPlants extends RepBase<Plants> { }