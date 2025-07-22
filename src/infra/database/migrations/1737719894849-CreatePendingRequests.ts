import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePendingRequests1737719894849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pending_requests",
                columns: [
                    {
                        name: "id",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                        type: "integer",
                    },
                    {
                        name: "method",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "DTO",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM pending_requests`);
    }
}