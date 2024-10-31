-- DropForeignKey
ALTER TABLE "lot_origins" DROP CONSTRAINT "lot_origins_purchase_order_id_fkey";

-- AlterTable
ALTER TABLE "lot_origins" ADD COLUMN     "bpr_id" TEXT,
ALTER COLUMN "purchase_order_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "lot_origins" ADD CONSTRAINT "lot_origins_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_origins" ADD CONSTRAINT "lot_origins_bpr_id_fkey" FOREIGN KEY ("bpr_id") REFERENCES "batch_production_records"("id") ON DELETE SET NULL ON UPDATE CASCADE;
