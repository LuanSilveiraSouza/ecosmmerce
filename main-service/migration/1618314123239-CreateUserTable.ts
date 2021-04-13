import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1618314123239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS user (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          password CHAR(128) NOT NULL,
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE CASCADE user;
  `);
  }
}
