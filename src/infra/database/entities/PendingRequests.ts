import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum PendingMethod {
    CreatePlant = 1,
    EditPlant = 2,
    CreateNotificationTrigger = 3,
    DeleteNotificationTrigger = 4,
}

@Entity("PendingRequests")
export class PendingRequests extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("integer")
    method: PendingMethod;

    @Column({ type: "text", nullable: true })
    DTO?: string;

    @CreateDateColumn({ type: "datetime" })
    createdAt: Date;
}
