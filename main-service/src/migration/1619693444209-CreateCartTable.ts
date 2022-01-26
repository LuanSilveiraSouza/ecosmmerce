import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartTable1619693444209 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS carts (
              id SERIAL PRIMARY KEY,
              total_price DECIMAL(12, 2) NOT NULL,
              user_id INT,
              CONSTRAINT fk_cart_user FOREIGN KEY(user_id) REFERENCES users(id)
            );
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE carts CASCADE;
          `);
    }
}
