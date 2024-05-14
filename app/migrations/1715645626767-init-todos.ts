import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTodos1715645626767 implements MigrationInterface {
  name = 'InitTodos1715645626767';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`todos\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`todos\``);
  }
}
