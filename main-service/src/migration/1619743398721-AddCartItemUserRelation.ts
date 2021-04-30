import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCartItemUserRelation1619743398721
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
				ALTER TABLE cart_items
						ADD user_id INT,
						ADD CONSTRAINT fk_item_user FOREIGN KEY(user_id) REFERENCES users(id)
				;
			`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
				ALTER TABLE cart_items
						DROP CONSTRAINT fk_item_user,
						DROP COLUMN user_id INT;
	`);
    }
}
