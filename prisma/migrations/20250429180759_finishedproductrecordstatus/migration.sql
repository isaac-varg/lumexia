/*
  Warnings:

  - Added the required column `record_status_id` to the `finished_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "finished_products" ADD COLUMN     "record_status_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "finished_products" ADD CONSTRAINT "finished_products_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
