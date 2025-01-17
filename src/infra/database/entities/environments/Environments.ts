import { Entity, Column } from "typeorm"
import { BaseEntity } from "../base/BaseEntity";

@Entity()
export class Environments extends BaseEntity  {
    @Column({ type: "varchar" })
    Title: string;
}