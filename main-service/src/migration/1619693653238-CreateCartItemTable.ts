import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartItemTable1619693653238 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cart_items (
              id SERIAL PRIMARY KEY,
              price DECIMAL(12, 2) NOT NULL,
              qtd INT,
              cart_id INT,
              CONSTRAINT fk_item_cart FOREIGN KEY(cart_id) REFERENCES carts(id),
              ticket_id INT,
              CONSTRAINT fk_item_ticket FOREIGN KEY(ticket_id) REFERENCES tickets(id)
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE cart_items CASCADE;
          `);
  }
}
