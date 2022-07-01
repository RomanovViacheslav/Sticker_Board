const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class PostRefactoringTIMESTAMP {
  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "title" RENAME TO "name"`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "name" RENAME TO "title"`
    );
  }
};
