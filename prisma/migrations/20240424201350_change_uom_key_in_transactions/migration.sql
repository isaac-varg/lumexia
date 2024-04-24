/*
  Warnings:

  - You are about to drop the column `unit_of_measurement_id` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `uom_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_unit_of_measurement_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "unit_of_measurement_id",
ADD COLUMN     "uom_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
