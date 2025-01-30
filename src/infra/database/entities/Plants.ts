import { Environments } from './Environments';
import { WaterFrequency } from './WaterFrequency';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable } from "typeorm"

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

    @ManyToMany(() => Environments, (environments) => environments.plants)
    @JoinTable({
        joinColumn: {
            name: "plantId", // Nome da coluna que referencia "Plants"
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "environmentId", // Nome da coluna que referencia "Environments"
            referencedColumnName: "id",
        },
    })
    environments: Environments[]
}
