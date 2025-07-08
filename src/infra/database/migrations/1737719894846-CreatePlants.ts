import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePlants1737719894846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Plants",
                columns: [
                    {
                        name: "id",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                        type: "integer",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "about",
                        type: "varchar",
                    },
                    {
                        name: 'imageUri',
                        type: 'varchar',
                    }
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Plants")
    }

}
