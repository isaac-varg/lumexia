/*
  Warnings:

  - You are about to drop the column `iscomplete` on the `bpr_step_actionables` table. All the data in the column will be lost.
  - Added the required column `isComplete` to the `bpr_step_actionables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bpr_step_actionables" DROP COLUMN "iscomplete",
ADD COLUMN     "isComplete" BOOLEAN NOT NULL;
