import { Entity, Column, ManyToOne, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { Plants } from "./Plants";

@Entity()
export class NotificationTrigger extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column("simple-array")
    weekDay: number[]; // 0 = Domingo, 1 = Segunda, etc.

    @Column("simple-array")
    triggersId: string[]; // IDs das triggers (string gerada pela lib)

    @Column()
    time: string; // Horário no formato HH:mm (ex: "08:00")

    @ManyToOne(() => Plants, (plant) => plant.notificationTriggers, { onDelete: "CASCADE" })
    plant: Plants;

    @Column()
    plantId: number; // FK explícita para a planta
}
