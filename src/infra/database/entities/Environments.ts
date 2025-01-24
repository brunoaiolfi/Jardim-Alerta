import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Environments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
    })
    name: string
}
