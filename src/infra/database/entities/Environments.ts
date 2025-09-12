import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from "typeorm"
import { Plants } from "./Plants"

@Entity()
export class Environments extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true,
    })
    name: string

    @ManyToMany(() => Plants, (plants) => plants.environments)
    plants: Plants[]
}
