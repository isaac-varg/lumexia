/*
  Warnings:

  - You are about to drop the column `capacity` on the `compounding_vessels` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_cost` on the `consumer_containers` table. All the data in the column will be lost.
  - Added the required column `capacity_maximum` to the `compounding_vessels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity_minimum` to the `compounding_vessels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compounding_vessels" DROP COLUMN "capacity",
ADD COLUMN     "capacity_maximum" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "capacity_minimum" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "consumer_containers" DROP COLUMN "shipping_cost";

-- AlterTable
ALTER TABLE "item_pricing_data" ADD COLUMN     "auxiliary_usage_cost" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "finished_product_archives" (
    "id" TEXT NOT NULL,
    "pricing_examination_id" TEXT NOT NULL,
    "current_finished_product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "filled_with_item_id" TEXT NOT NULL,
    "fill_quantity" DOUBLE PRECISION NOT NULL,
    "declared_quantity" DOUBLE PRECISION NOT NULL,
    "free_shipping_cost" DOUBLE PRECISION NOT NULL,
    "fill_uom_id" TEXT NOT NULL,
    "difficulty_adjustment_cost" DOUBLE PRECISION NOT NULL,
    "finished_product_total_cost" DOUBLE PRECISION NOT NULL,
    "auxiliaries_total_cost" DOUBLE PRECISION NOT NULL,
    "product_fill_cost" DOUBLE PRECISION NOT NULL,
    "consumer_price" DOUBLE PRECISION NOT NULL,
    "markup" DOUBLE PRECISION NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,
    "profit_percentage" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "finished_product_archives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finished_product_auxiliaries" (
    "id" TEXT NOT NULL,
    "apart_of_finished_product_id" TEXT NOT NULL,
    "auxiliary_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "difficulty_adjustment_cost" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "finishedProductArchiveId" TEXT,

    CONSTRAINT "finished_product_auxiliaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finished_product_auxiliary_archives" (
    "id" TEXT NOT NULL,
    "apart_of_finished_product_id" TEXT NOT NULL,
    "auxiliary_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "difficulty_adjustment_cost" DOUBLE PRECISION NOT NULL,
    "ipd_arrival_cost" DOUBLE PRECISION NOT NULL,
    "ipd_production_usage_cost" DOUBLE PRECISION NOT NULL,
    "ipd_auxiliary_usage_cost" DOUBLE PRECISION NOT NULL,
    "ipd_unforeseen_difficulties_cost" DOUBLE PRECISION NOT NULL,
    "ipd_upcoming_price" DOUBLE PRECISION NOT NULL,
    "ipd_upcoming_price_uom_id" TEXT NOT NULL,
    "ipd_is_upcoming_price_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "finished_product_auxiliary_archives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finished_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "filled_with_item_id" TEXT NOT NULL,
    "fill_quantity" DOUBLE PRECISION NOT NULL,
    "declared_quantity" DOUBLE PRECISION NOT NULL,
    "free_shipping_cost" DOUBLE PRECISION NOT NULL,
    "fill_uom_id" TEXT NOT NULL,
    "difficulty_adjustment_cost" DOUBLE PRECISION NOT NULL,
    "finished_product_total_cost" DOUBLE PRECISION NOT NULL,
    "auxiliaries_total_cost" DOUBLE PRECISION NOT NULL,
    "product_fill_cost" DOUBLE PRECISION NOT NULL,
    "consumer_price" DOUBLE PRECISION NOT NULL,
    "markup" DOUBLE PRECISION NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,
    "profit_percentage" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "finished_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "finished_product_archives" ADD CONSTRAINT "finished_product_archives_filled_with_item_id_fkey" FOREIGN KEY ("filled_with_item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_product_archives" ADD CONSTRAINT "finished_product_archives_fill_uom_id_fkey" FOREIGN KEY ("fill_uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_product_archives" ADD CONSTRAINT "finished_product_archives_pricing_examination_id_fkey" FOREIGN KEY ("pricing_examination_id") REFERENCES "pricing_examinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_product_archives" ADD CONSTRAINT "finished_product_archives_current_finished_product_id_fkey" FOREIGN KEY ("current_finished_product_id") REFERENCES "finished_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_product_auxiliaries" ADD CONSTRAINT "finished_product_auxiliaries_apart_of_finished_product_id_fkey" FOREIGN KEY ("apart_of_finished_product_id") REFERENCES "finished_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_product_auxiliaries" ADD CONSTRAINT "finished_product_auxiliaries_auxiliary_item_id_fkey" FOREIGN KEY ("auxiliary_item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_product_auxiliaries" ADD CONSTRAINT "finished_product_auxiliaries_finishedProductArchiveId_fkey" FOREIGN KEY ("finishedProductArchiveId") REFERENCES "finished_product_archives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_product_auxiliary_archives" ADD CONSTRAINT "finished_product_auxiliary_archives_apart_of_finished_prod_fkey" FOREIGN KEY ("apart_of_finished_product_id") REFERENCES "finished_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_product_auxiliary_archives" ADD CONSTRAINT "finished_product_auxiliary_archives_auxiliary_item_id_fkey" FOREIGN KEY ("auxiliary_item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_product_auxiliary_archives" ADD CONSTRAINT "finished_product_auxiliary_archives_ipd_upcoming_price_uom_fkey" FOREIGN KEY ("ipd_upcoming_price_uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_products" ADD CONSTRAINT "finished_products_filled_with_item_id_fkey" FOREIGN KEY ("filled_with_item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_products" ADD CONSTRAINT "finished_products_fill_uom_id_fkey" FOREIGN KEY ("fill_uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
