-- AlterTable
ALTER TABLE "finished_product_auxiliaries" ADD COLUMN     "record_status_id" TEXT NOT NULL DEFAULT 'd7b0a804-52c6-4586-b4f4-0fe49895f794';

-- AddForeignKey
ALTER TABLE "finished_product_auxiliaries" ADD CONSTRAINT "finished_product_auxiliaries_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
