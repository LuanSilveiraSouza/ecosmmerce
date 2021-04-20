import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProduct1618950455377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS travel (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(50) NOT NULL,
      destiny VARCHAR(50) NOT NULL,
      description VARCHAR(140),
    );
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE CASCADE travel;
  `);
  }
}
