import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRoles1571716422888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TYPE "user_role_enum" AS ENUM('admin', 'user', 'un-verified')`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" "user_role_enum" NOT NULL DEFAULT 'un-verified'`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`, undefined);
    await queryRunner.query(`DROP TYPE "user_role_enum"`, undefined);
  }
}
