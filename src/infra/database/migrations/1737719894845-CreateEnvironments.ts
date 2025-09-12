import { MigrationInterface, QueryRunner, Table } from "typeorm"
import uuid from "react-native-uuid";

export class CreateEnvironments1737719894845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(
                new Table({
                    name: "Environments",
                    columns: [
                        {
                            name: "id",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "uuid",
                            type: "uuid",
                        },
                        {
                            name: "name",
                            type: "varchar",
                            isUnique: true
                        }
                    ]
                }));


            await queryRunner.query(`
                INSERT INTO Environments (id, name) VALUES
                ('${uuid.v4()}', 'Sala'),
                ('${uuid.v4()}', 'Quarto'),
                ('${uuid.v4()}', 'Cozinha'),
                ('${uuid.v4()}', 'Banheiro')
            `);
        } catch (error) {
            console.error("Error during migration setup:", error);
            throw error; // Re-throw the error to ensure migration fails

        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Environments")
    }

}
