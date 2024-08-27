-- CreateTable
CREATE TABLE "batch_production_records" (
    "id" TEXT NOT NULL,
    "mbpr_id" TEXT NOT NULL,
    "bpr_status_id" TEXT NOT NULL,
    "batch_size_id" TEXT NOT NULL,
    "scheduled_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "released_at" TIMESTAMP(3),
    "reference_code" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batch_production_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bpr_bills_of_materials" (
    "id" TEXT NOT NULL,
    "bpr_id" TEXT NOT NULL,
    "bom_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "uomId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_bills_of_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bpr_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "batch_production_records" ADD CONSTRAINT "batch_production_records_mbpr_id_fkey" FOREIGN KEY ("mbpr_id") REFERENCES "master_batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch_production_records" ADD CONSTRAINT "batch_production_records_bpr_status_id_fkey" FOREIGN KEY ("bpr_status_id") REFERENCES "bpr_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch_production_records" ADD CONSTRAINT "batch_production_records_batch_size_id_fkey" FOREIGN KEY ("batch_size_id") REFERENCES "batch_sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_bills_of_materials" ADD CONSTRAINT "bpr_bills_of_materials_bpr_id_fkey" FOREIGN KEY ("bpr_id") REFERENCES "batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_bills_of_materials" ADD CONSTRAINT "bpr_bills_of_materials_bom_id_fkey" FOREIGN KEY ("bom_id") REFERENCES "bill_of_materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_bills_of_materials" ADD CONSTRAINT "bpr_bills_of_materials_uomId_fkey" FOREIGN KEY ("uomId") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
