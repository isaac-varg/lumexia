/*
  Warnings:

  - You are about to drop the column `scheduled_at` on the `batch_production_records` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "batch_production_records" DROP COLUMN "scheduled_at",
ADD COLUMN     "scheduled_for_end" TIMESTAMP(3),
ADD COLUMN     "scheduled_for_start" TIMESTAMP(3);
