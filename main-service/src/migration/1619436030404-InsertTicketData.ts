import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTicketData1619436030404 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO tickets (price, start_date, end_date, total, purchased, travel_id) VALUES 
      (3000.00, to_timestamp(${new Date(
          '2022-06-01',
      ).getTime()} / 1000.0), to_timestamp(${new Date(
                '2022-06-07',
            ).getTime()} / 1000.0), 100, 100, 1), 
      (800.00, to_timestamp(${new Date(
          '2021-11-14',
      ).getTime()} / 1000.0), to_timestamp(${new Date(
                '2021-11-16',
            ).getTime()} / 1000.0), 250, 250, 2), 
      (25000.00, to_timestamp(${new Date('2040-01-01').getTime()} / 1000.0),
      to_timestamp(${new Date('2040-01-03').getTime()} / 1000.0), 5, 5, 3);`,
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE tickets;`);
    }
}
