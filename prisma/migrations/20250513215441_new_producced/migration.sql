/*
  Warnings:

  - You are about to drop the column `material_cost` on the `bom_pricing_data_archives` table. All the data in the column will be lost.
  - Added the required column `examination_id` to the `bom_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material_price` to the `bom_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material_price_origin` to the `bom_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_material_cost` to the `bom_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upcoming_price_uom_id` to the `bom_pricing_data_archives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bom_pricing_data_archives" DROP COLUMN "material_cost",
ADD COLUMN     "examination_id" TEXT NOT NULL,
ADD COLUMN     "material_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "material_price_origin" TEXT NOT NULL,
ADD COLUMN     "total_material_cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "upcoming_price_uom_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "produced_examination_data_archives" (
    "id" TEXT NOT NULL,
    "examination_id" TEXT NOT NULL,
    "mbpr_id" TEXT NOT NULL,
    "mbpr_version_label" TEXT NOT NULL,
    "batch_size_id" TEXT NOT NULL,
    "batch_size_quantity" DOUBLE PRECISION NOT NULL,
    "compounding_vessel_id" TEXT NOT NULL,
    "compounding_vessel_equipment_name" TEXT NOT NULL,
    "compounding_tank_time" DOUBLE PRECISION NOT NULL,
    "bom_count" INTEGER NOT NULL,
    "total_bom_cost_per_batch" DOUBLE PRECISION NOT NULL,
    "total_bom_cost_per_lb" DOUBLE PRECISION NOT NULL,
    "total_cost_per_batch" DOUBLE PRECISION NOT NULL,
    "total_cost_per_lb" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produced_examination_data_archives_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bom_pricing_data_archives" ADD CONSTRAINT "bom_pricing_data_archives_examination_id_fkey" FOREIGN KEY ("examination_id") REFERENCES "pricing_examinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bom_pricing_data_archives" ADD CONSTRAINT "bom_pricing_data_archives_upcoming_price_uom_id_fkey" FOREIGN KEY ("upcoming_price_uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produced_examination_data_archives" ADD CONSTRAINT "produced_examination_data_archives_examination_id_fkey" FOREIGN KEY ("examination_id") REFERENCES "pricing_examinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produced_examination_data_archives" ADD CONSTRAINT "produced_examination_data_archives_mbpr_id_fkey" FOREIGN KEY ("mbpr_id") REFERENCES "master_batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produced_examination_data_archives" ADD CONSTRAINT "produced_examination_data_archives_batch_size_id_fkey" FOREIGN KEY ("batch_size_id") REFERENCES "batch_sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produced_examination_data_archives" ADD CONSTRAINT "produced_examination_data_archives_compounding_vessel_id_fkey" FOREIGN KEY ("compounding_vessel_id") REFERENCES "compounding_vessels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
