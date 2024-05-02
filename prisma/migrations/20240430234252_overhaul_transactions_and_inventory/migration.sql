/*
  Warnings:

  - You are about to drop the column `inital_quantity` on the `containers` table. All the data in the column will be lost.
  - You are about to drop the column `container_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `ContainerType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `initial_quantity` to the `Lot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uom_id` to the `Lot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `container_weight` to the `containers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lot_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "containers" DROP CONSTRAINT "containers_container_type_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_container_id_fkey";

-- AlterTable
ALTER TABLE "Lot" ADD COLUMN     "initial_quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "uom_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "containers" DROP COLUMN "inital_quantity",
ADD COLUMN     "container_weight" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "container_id",
ADD COLUMN     "lot_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "ContainerType";

-- CreateTable
CREATE TABLE "container_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "container_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "containers" ADD CONSTRAINT "containers_container_type_id_fkey" FOREIGN KEY ("container_type_id") REFERENCES "container_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lot" ADD CONSTRAINT "Lot_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "Lot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
