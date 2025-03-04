/*
  Warnings:

  - Added the required column `upcoming_price_uom_id` to the `item_pricing_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item_pricing_data" ADD COLUMN     "upcoming_price_uom_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "item_pricing_data" ADD CONSTRAINT "item_pricing_data_upcoming_price_uom_id_fkey" FOREIGN KEY ("upcoming_price_uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
