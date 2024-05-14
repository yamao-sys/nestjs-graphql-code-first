import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSubTodos1715692514327 implements MigrationInterface {
  name = 'InitSubTodos1715692514327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sub_todos\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`todo_id\` bigint NOT NULL, \`title\` varchar(255) NOT NULL, \`content\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_todos\` ADD CONSTRAINT \`FK_4fa6ec5723f5b457f381ea5bd63\` FOREIGN KEY (\`todo_id\`) REFERENCES \`todos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sub_todos\` DROP FOREIGN KEY \`FK_4fa6ec5723f5b457f381ea5bd63\``,
    );
    await queryRunner.query(`DROP TABLE \`sub_todos\``);
  }
}
