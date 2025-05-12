-- AlterTable
ALTER TABLE "users" ALTER COLUMN "roleId" DROP DEFAULT;
DROP SEQUENCE "users_roleId_seq";
