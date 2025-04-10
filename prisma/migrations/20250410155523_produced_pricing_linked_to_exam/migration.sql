/*
  Warnings:

  - Added the required column `examination_id` to the `produced_pricing_data_archives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produced_pricing_data_archives" ADD COLUMN     "examination_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "produced_pricing_data_archives" ADD CONSTRAINT "produced_pricing_data_archives_examination_id_fkey" FOREIGN KEY ("examination_id") REFERENCES "pricing_examinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
