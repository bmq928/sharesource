import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1724387182901 implements MigrationInterface {
    name = 'Initial1724387182901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_831d966f0b478d8b986b935100" ON "user_entity" ("created_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_5867ae49e64834adf86e42e65d" ON "user_entity" ("updated_at") `);
        await queryRunner.query(`CREATE TABLE "task_entity" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "name" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "created_by_id" uuid, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2a2b426601b4794cbd2f9c8489" ON "task_entity" ("created_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_9dd6be874b34ad505a60660e62" ON "task_entity" ("updated_at") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9dd6be874b34ad505a60660e62"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a2b426601b4794cbd2f9c8489"`);
        await queryRunner.query(`DROP TABLE "task_entity"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5867ae49e64834adf86e42e65d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_831d966f0b478d8b986b935100"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
