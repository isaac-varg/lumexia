-- CreateTable
CREATE TABLE "model_plurals" (
    "id" TEXT NOT NULL,
    "mbpr_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "uom_id" TEXT NOT NULL,
    "record_status_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "model_plurals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "model_plurals" ADD CONSTRAINT "model_plurals_mbpr_id_fkey" FOREIGN KEY ("mbpr_id") REFERENCES "master_batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "model_plurals" ADD CONSTRAINT "model_plurals_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "model_plurals" ADD CONSTRAINT "model_plurals_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
