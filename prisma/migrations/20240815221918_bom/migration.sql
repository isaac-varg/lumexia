/*
  Warnings:

  - You are about to drop the `model_plurals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "model_plurals" DROP CONSTRAINT "model_plurals_mbpr_id_fkey";

-- DropForeignKey
ALTER TABLE "model_plurals" DROP CONSTRAINT "model_plurals_record_status_id_fkey";

-- DropForeignKey
ALTER TABLE "model_plurals" DROP CONSTRAINT "model_plurals_uom_id_fkey";

-- DropTable
DROP TABLE "model_plurals";

-- CreateTable
CREATE TABLE "batch_sizes" (
    "id" TEXT NOT NULL,
    "mbpr_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "uom_id" TEXT NOT NULL,
    "record_status_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batch_sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch_steps" (
    "id" TEXT NOT NULL,
    "mbpr_id" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "phase" TEXT NOT NULL,
    "label" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batch_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_of_materials" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "mbpr_id" TEXT NOT NULL,
    "step_id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "concentration" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bill_of_materials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "batch_sizes" ADD CONSTRAINT "batch_sizes_mbpr_id_fkey" FOREIGN KEY ("mbpr_id") REFERENCES "master_batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch_sizes" ADD CONSTRAINT "batch_sizes_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch_sizes" ADD CONSTRAINT "batch_sizes_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch_steps" ADD CONSTRAINT "batch_steps_mbpr_id_fkey" FOREIGN KEY ("mbpr_id") REFERENCES "master_batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_of_materials" ADD CONSTRAINT "bill_of_materials_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_of_materials" ADD CONSTRAINT "bill_of_materials_mbpr_id_fkey" FOREIGN KEY ("mbpr_id") REFERENCES "master_batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_of_materials" ADD CONSTRAINT "bill_of_materials_step_id_fkey" FOREIGN KEY ("step_id") REFERENCES "batch_steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
