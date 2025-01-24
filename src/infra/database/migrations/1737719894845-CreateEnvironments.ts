import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateEnvironments1737719894845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Environments",
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
                        isUnique: true
                    }
                ]
            }))

        await queryRunner.query(`
                INSERT INTO Environments (name) VALUES
                ('Sala'),
                ('Quarto'),
                ('Cozinha'),
                ('Banheiro');
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Environments")
    }

}
