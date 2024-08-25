import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDefaultTimestamp1724569767660 implements MigrationInterface {
    name = 'ChangeDefaultTimestamp1724569767660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "created_at" SET DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "updated_at" SET DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "task_entity" ALTER COLUMN "created_at" SET DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "task_entity" ALTER COLUMN "updated_at" SET DEFAULT NOW()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity" ALTER COLUMN "updated_at" SET DEFAULT '2024-08-25 07:09:27.658683+00'`);
        await queryRunner.query(`ALTER TABLE "task_entity" ALTER COLUMN "created_at" SET DEFAULT '2024-08-25 07:09:27.658683+00'`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "updated_at" SET DEFAULT '2024-08-25 07:09:27.658683+00'`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "created_at" SET DEFAULT '2024-08-25 07:09:27.658683+00'`);
    }

}
