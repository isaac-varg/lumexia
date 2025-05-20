/*
  Warnings:

  - Added the required column `auxiliary_usage_cost` to the `item_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Made the column `current_item_pricing_data_id` on table `item_pricing_data_archives` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "item_pricing_data_archives" DROP CONSTRAINT "item_pricing_data_archives_current_item_pricing_data_id_fkey";

-- AlterTable
ALTER TABLE "item_pricing_data" ADD COLUMN     "overall_item_cost" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "item_pricing_data_archives" ADD COLUMN     "auxiliary_usage_cost" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "current_item_pricing_data_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "item_pricing_data_archives" ADD CONSTRAINT "item_pricing_data_archives_current_item_pricing_data_id_fkey" FOREIGN KEY ("current_item_pricing_data_id") REFERENCES "item_pricing_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
