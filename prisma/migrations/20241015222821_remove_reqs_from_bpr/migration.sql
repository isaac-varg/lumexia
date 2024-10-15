/*
  Warnings:

  - You are about to drop the column `secondary_verification_required` on the `bpr_step_actionables` table. All the data in the column will be lost.
  - You are about to drop the column `verification_required` on the `bpr_step_actionables` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bpr_step_actionables" DROP COLUMN "secondary_verification_required",
DROP COLUMN "verification_required";
