import { Environments } from "../../entities/Environments";
import { IRepBase, RepBase } from "../base/RepBase";

export interface IRepEnvironments extends IRepBase<Environments> { }

export class RepEnvironments extends RepBase<Environments> { }