import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePlantsAndWaterFrequency1737719894846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "WaterFrequency",
                columns: [
                    {
                        name: "id",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                        type: "integer",
                    },
                    {
                        name: "frequency",
                        type: "varchar",
                        isUnique: true
                    }
                ]
            }));

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
                        isUnique: true
                    },
                    {
                        name: "about",
                        type: "text",
                    },
                    {
                        name: "waterTips",
                        type: "text",
                    },
                    {
                        name: "frequencyTimes",
                        type: "integer",
                    },
                    {
                        name: "waterFrequencyId",
                        type: "integer",
                        isNullable: false,
                    },
                ]
            }));

        await queryRunner.createForeignKey(
            "Plants",
            new TableForeignKey({
                columnNames: ["waterFrequencyId"],
                referencedColumnNames: ["id"],
                referencedTableName: "WaterFrequency",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.query(`
                INSERT INTO WaterFrequency (id, frequency) VALUES 
                (1, 'day'), 
                (2, 'week'), 
                (3, 'month')
            `);

        await queryRunner.query(`  INSERT INTO plants (id, name, about, waterTips, frequencyTimes, waterFrequencyId) VALUES
            (1, 'Aningapara', 'É uma espécie tropical que tem crescimento rápido e fácil manuseio.', 'Mantenha a terra sempre húmida sem encharcar. Regue 2 vezes na semana.', 2, 2),
            (2, 'Zamioculca', 'Apesar de florescer na primavera, fica o ano todo bonita e verdinha.', 'Utilize vasos com furos e pedras no fundo para facilitar a drenagem. Regue 1 vez no dia.', 1, 1),
            (3, 'Peperomia', 'Adapta-se tanto ao sol e sombra, mas prefere ficar num cantinho fresco, sem sol direto.', 'Nos dias mais quentes borrife água nas folhas. Regue 3 vezes na semana.', 3, 2),
            (4, 'Imbé', 'De médio porte que se adapta a diversas regiões, além de ser bem fácil de cultivar. Conquista cada vez mais pessoas.', 'Mantenha a terra sempre húmida sem encharcar. Regue 2 vezes na semana.', 2, 2),
            (5, 'Espada São Jorge', 'O aroma reduz os níveis de ansiedade e seu cheiro ajudar na qualidade do sono e a produtividade durante o dia.', 'Regue o solo ao redor. Regue 1 vez no dia.', 1, 1),
            (6, 'Yucca', 'São indicadas pois são fáceis de manter e cuidar. Você colocar em pequenos vasos, ou até mesmo em xícaras.', 'Graças à reserva de água dessas verdinhas, é sempre melhor regar pouco. Regue 1 vez na semana.', 1, 2),
            (7, 'Frutíferas', 'Exigem algumas horinhas de sol por dia, por isso deixe próximo a janelas.', 'Regue sempre na terra e não as folhas. Regue 3 vezes na semana.', 3,2),
            (8, 'Orquídea', 'Traz sensação de tranquilidade e paz ao ambiente. Requer pouca manutenção e ótima para quem tem pouco espaço.', 'Regue moderadamente. Reque 4 vezes na semana.', 4,2),
            (9, 'Violeta', 'Com flores delicadas. Elas são ótimas sugestões para decorar o banheiro.', 'Nada de molhar as flores e folhas. Regue o solo 2 vezes na semana.', 2,2),
            (10, 'Hortênsia', 'A hortênsia é uma planta rústica e se adapta a diferentes tipos de solos.', 'Mantenha a terra sempre húmida sem encharcar. Regue 1 vez no dia.', 1,1)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Plants")
        await queryRunner.dropTable("WaterFrequency")
    }

}
