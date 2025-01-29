import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Plants } from "./Plants"

export enum EnumWaterFrequency {
    DAY="day",
    WEEK="week",
    MONTH="month",
}

@Entity()
export class WaterFrequency extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    frequency: string

    @OneToMany(() => Plants, plant => plant.waterFrequency)
    plants: Plants[]
}
