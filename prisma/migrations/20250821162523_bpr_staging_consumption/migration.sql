-- CreateTable
CREATE TABLE "bpr_staging_consumptions" (
    "id" TEXT NOT NULL,
    "bpr_staging_id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_staging_consumptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bpr_staging_consumptions_bpr_staging_id_key" ON "bpr_staging_consumptions"("bpr_staging_id");

-- CreateIndex
CREATE UNIQUE INDEX "bpr_staging_consumptions_transaction_id_key" ON "bpr_staging_consumptions"("transaction_id");

-- AddForeignKey
ALTER TABLE "bpr_staging_consumptions" ADD CONSTRAINT "bpr_staging_consumptions_bpr_staging_id_fkey" FOREIGN KEY ("bpr_staging_id") REFERENCES "bpr_stagings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_staging_consumptions" ADD CONSTRAINT "bpr_staging_consumptions_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
