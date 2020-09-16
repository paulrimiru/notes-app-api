import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordReset1571781243599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "password_reset_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "code" character varying NOT NULL, "valid" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_ee2e748d67c66b2e71e0c043fac" PRIMARY KEY ("id", "email", "code"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "password_reset_requests"`, undefined);
  }
}
