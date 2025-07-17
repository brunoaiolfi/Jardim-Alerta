import { Environments } from './Environments';
import { NotificationTrigger } from './NotificationTrigger';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, OneToMany } from "typeorm"

@Entity()
export class Plants extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    about: string
    
    @Column()
    imageUri: string

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

    @OneToMany(() => NotificationTrigger, (notificationTrigger) => notificationTrigger.plant)
    notificationTriggers: NotificationTrigger[];
}
