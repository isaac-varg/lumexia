/*
  Warnings:

  - Added the required column `secondary_verification_required` to the `step_actionables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verification_required` to the `step_actionables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "step_actionables" ADD COLUMN     "secondary_verification_required" BOOLEAN NOT NULL,
ADD COLUMN     "verification_required" BOOLEAN NOT NULL;
