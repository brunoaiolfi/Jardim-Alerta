import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePendingRequests1737719894849 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "PendingRequests",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "method",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "DTO",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("PendingRequests");
    }
}
