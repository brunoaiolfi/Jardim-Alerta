import { ObjectLiteral, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity implements ObjectLiteral {
    @PrimaryGeneratedColumn()
    Id: number;
}