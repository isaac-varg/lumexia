/*
  Warnings:

  - You are about to drop the column `estimatedTotalTime` on the `master_batch_production_records` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "master_batch_production_records" DROP COLUMN "estimatedTotalTime",
ADD COLUMN     "estimated_total_time" DOUBLE PRECISION;
