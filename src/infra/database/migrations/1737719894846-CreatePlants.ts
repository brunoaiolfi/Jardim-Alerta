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
                        isUnique: true
                    },
                    {
                        name: "about",
                        type: "text",
                    },
                ]
            }));

        await queryRunner.query(`INSERT INTO plants (id, name, about) VALUES
            (1, 'Aningapara', 'É uma espécie tropical que tem crescimento rápido e fácil manuseio.'),
            (2, 'Zamioculca', 'Apesar de florescer na primavera, fica o ano todo bonita e verdinha.'),
            (3, 'Peperomia', 'Adapta-se tanto ao sol e sombra, mas prefere ficar num cantinho fresco, sem sol direto.'),
            (4, 'Imbé', 'De médio porte que se adapta a diversas regiões, além de ser bem fácil de cultivar. Conquista cada vez mais pessoas.'),
            (5, 'Espada São Jorge', 'O aroma reduz os níveis de ansiedade e seu cheiro ajudar na qualidade do sono e a produtividade durante o dia.'),
            (6, 'Yucca', 'São indicadas pois são fáceis de manter e cuidar. Você colocar em pequenos vasos, ou até mesmo em xícaras.'),
            (7, 'Frutíferas', 'Exigem algumas horinhas de sol por dia, por isso deixe próximo a janelas.'),
            (8, 'Orquídea', 'Traz sensação de tranquilidade e paz ao ambiente. Requer pouca manutenção e ótima para quem tem pouco espaço.'),
            (9, 'Violeta', 'Com flores delicadas. Elas são ótimas sugestões para decorar o banheiro.'),
            (10, 'Hortênsia', 'A hortênsia é uma planta rústica e se adapta a diferentes tipos de solos.')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Plants")
    }

}
