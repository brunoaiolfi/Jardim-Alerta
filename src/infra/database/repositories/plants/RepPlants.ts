import { Plants } from "../../entities/Plants";
import { RepBase } from "../base/RepBase";
import { IRepPlants } from "./IRepPlants";

export class RepPlants extends RepBase<Plants> implements IRepPlants{ }