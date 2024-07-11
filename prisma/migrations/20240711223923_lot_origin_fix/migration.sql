/*
  Warnings:

  - You are about to drop the `LotOrigin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LotOrigin" DROP CONSTRAINT "LotOrigin_purchaseOrderId_fkey";

-- DropTable
DROP TABLE "LotOrigin";

-- CreateTable
CREATE TABLE "lot_origins" (
    "id" TEXT NOT NULL,
    "lot_id" TEXT NOT NULL,
    "purchase_order_id" TEXT NOT NULL,
    "origin_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lot_origins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lot_origins" ADD CONSTRAINT "lot_origins_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_origins" ADD CONSTRAINT "lot_origins_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
