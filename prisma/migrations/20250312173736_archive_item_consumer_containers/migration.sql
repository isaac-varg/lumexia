-- AlterTable
ALTER TABLE "item_consumer_containers" ADD COLUMN     "record_status_id" TEXT NOT NULL DEFAULT 'cd5f3f81-493b-4bc0-9637-a36f7157e150';

-- AddForeignKey
ALTER TABLE "item_consumer_containers" ADD CONSTRAINT "item_consumer_containers_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
