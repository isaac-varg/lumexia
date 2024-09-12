-- CreateTable
CREATE TABLE "bpr_stagings" (
    "id" TEXT NOT NULL,
    "bpr_bom_id" TEXT NOT NULL,
    "lot_id" TEXT NOT NULL,
    "pulled_by_user_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "uom_id" TEXT NOT NULL,
    "bpr_staging_status_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_stagings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bpr_stagings" ADD CONSTRAINT "bpr_stagings_bpr_bom_id_fkey" FOREIGN KEY ("bpr_bom_id") REFERENCES "bpr_bills_of_materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_stagings" ADD CONSTRAINT "bpr_stagings_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_stagings" ADD CONSTRAINT "bpr_stagings_pulled_by_user_id_fkey" FOREIGN KEY ("pulled_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_stagings" ADD CONSTRAINT "bpr_stagings_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_stagings" ADD CONSTRAINT "bpr_stagings_bpr_staging_status_id_fkey" FOREIGN KEY ("bpr_staging_status_id") REFERENCES "bpr_staging_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
