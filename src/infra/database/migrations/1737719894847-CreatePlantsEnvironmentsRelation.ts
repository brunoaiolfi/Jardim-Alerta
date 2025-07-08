import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePlantsEnvironmentsRelation1737719894847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "plants_environments_environments",
                columns: [
                    {
                        name: "plantId",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "environmentId",
                        type: "int",
                        isPrimary: true,
                    },
                ],
            }));

        await queryRunner.createForeignKey(
            "plants_environments_environments",
            new TableForeignKey({
                columnNames: ["plantId"],
                referencedColumnNames: ["id"],
                referencedTableName: "Plants",
                onDelete: "CASCADE",
            })
        );

        // Criando chave estrangeira para environmentId
        await queryRunner.createForeignKey(
            "plants_environments_environments",
            new TableForeignKey({
                columnNames: ["environmentId"],
                referencedColumnNames: ["id"],
                referencedTableName: "Environments",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM plants_environments_environments`);

        await queryRunner.dropTable("plants_environments_environments")
    }

}
