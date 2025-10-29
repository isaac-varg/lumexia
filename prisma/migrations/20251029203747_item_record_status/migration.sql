-- AlterTable
ALTER TABLE "items" ADD COLUMN     "record_status_id" TEXT NOT NULL DEFAULT 'cd5f3f81-493b-4bc0-9637-a36f7157e150';

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
