-- DropForeignKey
ALTER TABLE "item_pricing_data_archives" DROP CONSTRAINT "item_pricing_data_archives_current_item_pricing_data_id_fkey";

-- AlterTable
ALTER TABLE "item_pricing_data_archives" ALTER COLUMN "current_item_pricing_data_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "item_pricing_data_archives" ADD CONSTRAINT "item_pricing_data_archives_current_item_pricing_data_id_fkey" FOREIGN KEY ("current_item_pricing_data_id") REFERENCES "item_pricing_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
