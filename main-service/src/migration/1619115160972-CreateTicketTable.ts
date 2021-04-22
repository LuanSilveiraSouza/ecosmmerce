import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTicketTable1619115160972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS tickets (
          id SERIAL PRIMARY KEY,
          price DECIMAL(12, 2) NOT NULL,
          date TIMESTAMP NOT NULL,
          travel_id INT NOT NULL,
          FOREIGN KEY (travel_id) REFERENCES travels(id)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE tickets CASCADE;
      `);
  }
}
