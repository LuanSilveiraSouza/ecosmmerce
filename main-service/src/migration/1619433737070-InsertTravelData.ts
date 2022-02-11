import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTravelData1619433737070 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO travels (title, destiny, description)
            VALUES 
            ('Tour in the Tunnel System', 'Magrathea', 'Take a tour in the high-tech underground tunnel system until a look to the legendary spaceship: Heart of Gold'),
            ('Waterfalls of Naboo', 'Naboo', 'Explore the forests and incredible waterfalls of Naboo; interact with the human colonies and with Jar Jar Binks!'),
            ('Event horizon of a Black Hole', 'Center of Milky Way', 'Go to the center of the galaxy and presence a Black Hole in person! PS: The trip can be one-way')
            ;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE travels CASCADE;`);
  }
}
