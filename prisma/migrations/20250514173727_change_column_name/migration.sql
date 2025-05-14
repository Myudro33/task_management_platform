/*
  Warnings:

  - You are about to drop the column `uploadById` on the `files` table. All the data in the column will be lost.
  - Added the required column `uploadedBy` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_uploadById_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "uploadById",
ADD COLUMN     "uploadedBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
