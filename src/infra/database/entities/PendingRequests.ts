import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export enum PendingMethod {
    CreatePlant = 1,
    EditPlant = 2,

    CreateNotificationTrigger = 3,
    DeleteNotificationTrigger = 4
}

export class PendingRequests extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({
        type: "enum",
        enum: PendingMethod

    })
    method: PendingMethod

    @Column({
        nullable: true
    })
    DTO?: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}