/*
  Warnings:

  - A unique constraint covering the columns `[bpr_id]` on the table `lot_origins` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lot_origins_bpr_id_key" ON "lot_origins"("bpr_id");
