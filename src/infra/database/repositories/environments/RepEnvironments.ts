import { Environments } from "../../entities/Environments";
import { RepBase } from "../base/RepBase";
import { IRepEnvironments } from "./IRepEnvironments";

export class RepEnvironments extends RepBase<Environments> implements IRepEnvironments{ }