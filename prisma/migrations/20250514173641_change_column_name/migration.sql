/*
  Warnings:

  - You are about to drop the column `uploadBy` on the `files` table. All the data in the column will be lost.
  - Added the required column `uploadById` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_uploadBy_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "uploadBy",
ADD COLUMN     "uploadById" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_uploadById_fkey" FOREIGN KEY ("uploadById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
