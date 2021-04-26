import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTicketData1619436030404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` INSERT INTO tickets (price, date, travel_id) VALUES 
      (3000.00, to_timestamp(${new Date('2022-06-01').getTime()} / 1000.0), 1), 
      (800.00, to_timestamp(${new Date('2021-11-14').getTime()} / 1000.0), 2), 
      (25000.00, to_timestamp(${new Date(
        '2040-01-01',
      ).getTime()} / 1000.0), 3);`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE tickets;`);
  }
}
