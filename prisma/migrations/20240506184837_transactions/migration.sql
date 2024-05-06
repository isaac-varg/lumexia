/*
  Warnings:

  - You are about to drop the `Lot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lot" DROP CONSTRAINT "Lot_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Lot" DROP CONSTRAINT "Lot_uom_id_fkey";

-- DropForeignKey
ALTER TABLE "containers" DROP CONSTRAINT "containers_lot_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_lot_id_fkey";

-- DropTable
DROP TABLE "Lot";

-- CreateTable
CREATE TABLE "lots" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "lot_number" TEXT NOT NULL,
    "initial_quantity" DOUBLE PRECISION NOT NULL,
    "uom_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "containers" ADD CONSTRAINT "containers_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lots" ADD CONSTRAINT "lots_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lots" ADD CONSTRAINT "lots_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
