/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `purchase_order_status` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_status_name_key" ON "purchase_order_status"("name");
