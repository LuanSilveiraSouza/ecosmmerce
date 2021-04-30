import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTravelTable1619115155724 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS travels (
          id SERIAL PRIMARY KEY,
          title VARCHAR(50) NOT NULL,
          destiny VARCHAR(50) NOT NULL,
          description VARCHAR(140)
        );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE travels CASCADE;
      `);
    }
}
