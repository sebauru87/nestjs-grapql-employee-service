const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class uniqueCodeProjectDecorator1655234149635 {
  name = 'uniqueCodeProjectDecorator1655234149635';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "UQ_b58774a8460d69d09c888158ab1" UNIQUE ("code")`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "UQ_b58774a8460d69d09c888158ab1"`,
    );
  }
};
