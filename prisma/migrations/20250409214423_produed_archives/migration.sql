-- CreateTable
CREATE TABLE "bom_pricing_data_archives" (
    "id" TEXT NOT NULL,
    "produced_pricing_data_archive_id" TEXT NOT NULL,
    "bom_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "material_cost" DOUBLE PRECISION NOT NULL,
    "upcoming_price_used" BOOLEAN NOT NULL,
    "arrival_cost" DOUBLE PRECISION NOT NULL,
    "unforeseen_difficulties_cost" DOUBLE PRECISION NOT NULL,
    "production_usage_cost" DOUBLE PRECISION NOT NULL,
    "overall_item_cost_per_lb" DOUBLE PRECISION NOT NULL,
    "overall_item_cost_per_batch" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bom_pricing_data_archives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produced_pricing_data_archives" (
    "id" TEXT NOT NULL,
    "bom_cost_per_batch" DOUBLE PRECISION NOT NULL,
    "bom_cost_per_lb" DOUBLE PRECISION NOT NULL,
    "mbpr_id" TEXT NOT NULL,
    "batch_size_id" TEXT NOT NULL,
    "batch_size_quantity" DOUBLE PRECISION NOT NULL,
    "mbpr_version_label" TEXT NOT NULL,
    "production_vessel_name" TEXT NOT NULL,
    "tank_time" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produced_pricing_data_archives_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bom_pricing_data_archives" ADD CONSTRAINT "bom_pricing_data_archives_produced_pricing_data_archive_id_fkey" FOREIGN KEY ("produced_pricing_data_archive_id") REFERENCES "produced_pricing_data_archives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bom_pricing_data_archives" ADD CONSTRAINT "bom_pricing_data_archives_bom_id_fkey" FOREIGN KEY ("bom_id") REFERENCES "bill_of_materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bom_pricing_data_archives" ADD CONSTRAINT "bom_pricing_data_archives_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produced_pricing_data_archives" ADD CONSTRAINT "produced_pricing_data_archives_mbpr_id_fkey" FOREIGN KEY ("mbpr_id") REFERENCES "master_batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produced_pricing_data_archives" ADD CONSTRAINT "produced_pricing_data_archives_batch_size_id_fkey" FOREIGN KEY ("batch_size_id") REFERENCES "batch_sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
