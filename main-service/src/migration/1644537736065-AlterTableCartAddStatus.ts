import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCartAddStatus1644537736065
  implements MigrationInterface
{
  name = 'AlterTableCartAddStatus1644537736065';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE cart_status AS ENUM('active', 'finished');
            ALTER TABLE carts ADD COLUMN IF NOT EXISTS status cart_status;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE carts DROP COLUMN IF EXISTS status;
            DROP TYPE cart_status;
        `);
  }
}
