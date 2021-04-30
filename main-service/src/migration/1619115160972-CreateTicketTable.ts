import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTicketTable1619115160972 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS tickets (
          id SERIAL PRIMARY KEY,
          price DECIMAL(12, 2) NOT NULL,
          start_date TIMESTAMP NOT NULL,
          end_date TIMESTAMP NOT NULL,
          total INT,
          purchased INT,
          travel_id INT,
          CONSTRAINT fk_ticket_travel FOREIGN KEY(travel_id) REFERENCES travels(id)
        );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE tickets CASCADE;
      `);
    }
}
