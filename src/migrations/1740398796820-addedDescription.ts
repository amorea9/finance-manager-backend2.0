import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDescription1740398796820 implements MigrationInterface {
    name = 'AddedDescription1740398796820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "description" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "description"`);
    }

}
