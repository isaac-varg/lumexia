/*
  Warnings:

  - A unique constraint covering the columns `[sequence]` on the table `purchase_order_status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sequence` to the `purchase_order_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchase_order_status" ADD COLUMN     "sequence" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_status_sequence_key" ON "purchase_order_status"("sequence");
