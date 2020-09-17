import {MigrationInterface, QueryRunner} from "typeorm";

export class MVPSchema1600378400004 implements MigrationInterface {
    name = 'MVPSchema1600378400004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "notes" character varying, "categoryId" uuid, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'user', 'un-verified')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "role" "user_role_enum" NOT NULL DEFAULT 'un-verified', "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "organizationId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "password_reset_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "code" character varying NOT NULL, "valid" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_ee2e748d67c66b2e71e0c043fac" PRIMARY KEY ("id", "email", "code"))`);
        await queryRunner.query(`CREATE TABLE "user_organisations_organization" ("userId" uuid NOT NULL, "organizationId" uuid NOT NULL, CONSTRAINT "PK_e65b2fdfefaa48f07cb74d42e65" PRIMARY KEY ("userId", "organizationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca7d803877dab6b5205c711efd" ON "user_organisations_organization" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf59336f338165b53cacce635c" ON "user_organisations_organization" ("organizationId") `);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_fa0889ab27ba7dd8a59f9e7065c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_67c515257c7a4bc221bb1857a39" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_e622399a6d565cafb9c754f093d" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_organisations_organization" ADD CONSTRAINT "FK_ca7d803877dab6b5205c711efdc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_organisations_organization" ADD CONSTRAINT "FK_bf59336f338165b53cacce635c0" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_organisations_organization" DROP CONSTRAINT "FK_bf59336f338165b53cacce635c0"`);
        await queryRunner.query(`ALTER TABLE "user_organisations_organization" DROP CONSTRAINT "FK_ca7d803877dab6b5205c711efdc"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_e622399a6d565cafb9c754f093d"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_67c515257c7a4bc221bb1857a39"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_fa0889ab27ba7dd8a59f9e7065c"`);
        await queryRunner.query(`DROP INDEX "IDX_bf59336f338165b53cacce635c"`);
        await queryRunner.query(`DROP INDEX "IDX_ca7d803877dab6b5205c711efd"`);
        await queryRunner.query(`DROP TABLE "user_organisations_organization"`);
        await queryRunner.query(`DROP TABLE "password_reset_requests"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "note"`);
    }

}
