import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateNotificationTriggerPlantRelation1737719894848 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "notification_trigger",
                columns: [
                    {
                        name: "id",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                        type: "integer",
                    },
                    {
                        name: "weekDay",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "triggersId",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "time",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "plantId",
                        type: "integer",
                        isNullable: false,
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "notification_trigger",
            new TableForeignKey({
                columnNames: ["plantId"],
                referencedColumnNames: ["id"],
                referencedTableName: "plants",
                onDelete: "CASCADE", // Se deletar uma planta, deleta os triggers relacionados
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM notification_trigger`);

        await queryRunner.dropTable("notification_trigger")
    }
}