import { Entity, PrimaryColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Plants } from "./Plants";

@Entity()
export class NotificationTrigger extends BaseEntity{
    @PrimaryColumn()
    id: string; // ID da trigger (string gerada pela lib)

    @Column("simple-array")
    weekDay: number[]; // 0 = Domingo, 1 = Segunda, etc.

    @Column()
    time: string; // Horário no formato HH:mm (ex: "08:00")

    @ManyToOne(() => Plants, (plant) => plant.notificationTriggers, { onDelete: "CASCADE" })
    plant: Plants;

    @Column()
    plantId: number; // FK explícita para a planta
}
