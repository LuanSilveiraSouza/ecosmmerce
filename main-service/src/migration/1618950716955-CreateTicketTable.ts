import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProduct1618950455377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS ticket (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      price DECIMAL(12, 2) NOT NULL,
      date TIMESTAMP NOT NULL,
      travel_id INT NOT NULL,
      FOREIGN KEY (travel_id) REFERENCES travel(id)
    );
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE CASCADE ticket;
  `);
  }
}
