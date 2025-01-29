import { WaterFrequency } from './WaterFrequency';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"

@Entity()
export class Plants extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    about: string

    @Column()
    waterTips: string

    @Column()
    frequencyTimes: number

    @ManyToOne(() => WaterFrequency, (waterFrequency) => waterFrequency.plants)
    waterFrequency: WaterFrequency

    @Column()
    waterFrequencyId: number
}
