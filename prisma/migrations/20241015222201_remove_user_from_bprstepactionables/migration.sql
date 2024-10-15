/*
  Warnings:

  - You are about to drop the column `userId` on the `bpr_step_actionables` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bpr_step_actionables" DROP CONSTRAINT "bpr_step_actionables_userId_fkey";

-- AlterTable
ALTER TABLE "bpr_step_actionables" DROP COLUMN "userId";
