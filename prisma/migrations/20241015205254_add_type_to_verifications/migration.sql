/*
  Warnings:

  - Added the required column `type` to the `bpr_step_actionable_verifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bpr_step_actionable_verifications" ADD COLUMN     "type" TEXT NOT NULL;
