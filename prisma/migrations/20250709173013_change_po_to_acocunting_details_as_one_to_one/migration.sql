/*
  Warnings:

  - A unique constraint covering the columns `[purchase_order_id]` on the table `po_accounting_details` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "po_accounting_details_purchase_order_id_key" ON "po_accounting_details"("purchase_order_id");
