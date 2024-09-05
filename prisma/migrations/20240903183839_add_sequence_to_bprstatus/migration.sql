/*
  Warnings:

  - A unique constraint covering the columns `[sequence]` on the table `bpr_statuses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sequence` to the `bpr_statuses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bpr_statuses" ADD COLUMN     "sequence" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bpr_statuses_sequence_key" ON "bpr_statuses"("sequence");
