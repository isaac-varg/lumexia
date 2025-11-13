/*
  Warnings:

  - A unique constraint covering the columns `[lot_id]` on the table `purchase_order_items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "items" ALTER COLUMN "inventory_uom_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "purchase_order_items" ADD COLUMN     "lot_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_items_lot_id_key" ON "purchase_order_items"("lot_id");

-- AddForeignKey
ALTER TABLE "purchase_order_items" ADD CONSTRAINT "purchase_order_items_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "lots"("id") ON DELETE SET NULL ON UPDATE CASCADE;
