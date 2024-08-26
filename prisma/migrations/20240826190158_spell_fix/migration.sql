/*
  Warnings:

  - You are about to drop the column `conten` on the `step_addendums` table. All the data in the column will be lost.
  - Added the required column `content` to the `step_addendums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "step_addendums" DROP COLUMN "conten",
ADD COLUMN     "content" TEXT NOT NULL;
