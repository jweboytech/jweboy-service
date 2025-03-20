import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1742494284844 implements MigrationInterface {
    name = 'Migrations1742494284844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "description" character varying(100), "link" character varying NOT NULL, "type" "public"."project_type_enum" NOT NULL, "screenshots" text NOT NULL, "video" character varying, "is_public" boolean NOT NULL DEFAULT false, "is_deleted" boolean NOT NULL DEFAULT false, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_3caef906211aad45559039f11f9" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_3caef906211aad45559039f11f9"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
