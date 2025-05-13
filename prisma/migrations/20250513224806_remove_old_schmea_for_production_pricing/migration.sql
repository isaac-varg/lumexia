/*
  Warnings:

  - You are about to drop the column `bom_cost_per_batch` on the `produced_pricing_data_archives` table. All the data in the column will be lost.
  - You are about to drop the column `bom_cost_per_lb` on the `produced_pricing_data_archives` table. All the data in the column will be lost.
  - You are about to drop the column `production_vessel_name` on the `produced_pricing_data_archives` table. All the data in the column will be lost.
  - You are about to drop the column `tank_time` on the `produced_pricing_data_archives` table. All the data in the column will be lost.
  - You are about to drop the `produced_examination_data_archives` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bom_count` to the `produced_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compounding_tank_time` to the `produced_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compounding_vessel_equipment_name` to the `produced_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compounding_vessel_id` to the `produced_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_bom_cost_per_batch` to the `produced_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_bom_cost_per_lb` to the `produced_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_cost_per_batch` to the `produced_pricing_data_archives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_cost_per_lb` to the `produced_pricing_data_archives` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "produced_examination_data_archives" DROP CONSTRAINT "produced_examination_data_archives_batch_size_id_fkey";

-- DropForeignKey
ALTER TABLE "produced_examination_data_archives" DROP CONSTRAINT "produced_examination_data_archives_compounding_vessel_id_fkey";

-- DropForeignKey
ALTER TABLE "produced_examination_data_archives" DROP CONSTRAINT "produced_examination_data_archives_examination_id_fkey";

-- DropForeignKey
ALTER TABLE "produced_examination_data_archives" DROP CONSTRAINT "produced_examination_data_archives_mbpr_id_fkey";

-- AlterTable
ALTER TABLE "produced_pricing_data_archives" DROP COLUMN "bom_cost_per_batch",
DROP COLUMN "bom_cost_per_lb",
DROP COLUMN "production_vessel_name",
DROP COLUMN "tank_time",
ADD COLUMN     "bom_count" INTEGER NOT NULL,
ADD COLUMN     "compounding_tank_time" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "compounding_vessel_equipment_name" TEXT NOT NULL,
ADD COLUMN     "compounding_vessel_id" TEXT NOT NULL,
ADD COLUMN     "total_bom_cost_per_batch" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_bom_cost_per_lb" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_cost_per_batch" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_cost_per_lb" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "produced_examination_data_archives";

-- AddForeignKey
ALTER TABLE "produced_pricing_data_archives" ADD CONSTRAINT "produced_pricing_data_archives_compounding_vessel_id_fkey" FOREIGN KEY ("compounding_vessel_id") REFERENCES "compounding_vessels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
