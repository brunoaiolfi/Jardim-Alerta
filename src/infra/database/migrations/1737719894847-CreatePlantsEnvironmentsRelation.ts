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

        await queryRunner.query(`
            INSERT INTO plants_environments_environments (plantId, environmentId) VALUES 
            (1, 1), 
            (1, 3), 
            (2, 1), 
            (2, 2), 
            (3, 2), 
            (4, 2), 
            (4, 1), 
            (5, 1), 
            (5, 2), 
            (6, 3), 
            (6, 2), 
            (7, 3), 
            (7, 1), 
            (8, 4), 
            (9, 4), 
            (10, 4)
        `);

        const a = await queryRunner.query("SELECT * FROM plants_environments_environments")
        console.log(a)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM plants_environments_environments`);

        await queryRunner.dropTable("plants_environments_environments")
    }

}
