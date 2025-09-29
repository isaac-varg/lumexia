/*
  Warnings:

  - You are about to drop the column `data_type` on the `qc_parameters` table. All the data in the column will be lost.
  - You are about to drop the column `inputDefinition` on the `qc_parameters` table. All the data in the column will be lost.
  - Added the required column `data_type_id` to the `qc_parameters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "qc_parameters" DROP COLUMN "data_type",
DROP COLUMN "inputDefinition",
ADD COLUMN     "data_type_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "qc_data_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_data_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_item_specification_inputs" (
    "id" TEXT NOT NULL,
    "parameter_input_definition_id" TEXT NOT NULL,
    "item_specification_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_item_specification_inputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_item_specifications" (
    "id" TEXT NOT NULL,
    "item_parameter_id" TEXT NOT NULL,
    "value_a" TEXT NOT NULL,
    "value_b" TEXT,
    "specification_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_item_specifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_parameter_input_definitions" (
    "id" TEXT NOT NULL,
    "parameter_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "data_type_id" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "unit" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_parameter_input_definitions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "qc_item_specification_inputs" ADD CONSTRAINT "qc_item_specification_inputs_parameter_input_definition_id_fkey" FOREIGN KEY ("parameter_input_definition_id") REFERENCES "qc_parameter_input_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_item_specification_inputs" ADD CONSTRAINT "qc_item_specification_inputs_item_specification_id_fkey" FOREIGN KEY ("item_specification_id") REFERENCES "qc_item_specifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_item_specifications" ADD CONSTRAINT "qc_item_specifications_item_parameter_id_fkey" FOREIGN KEY ("item_parameter_id") REFERENCES "qc_item_parameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_parameter_input_definitions" ADD CONSTRAINT "qc_parameter_input_definitions_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "qc_parameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_parameter_input_definitions" ADD CONSTRAINT "qc_parameter_input_definitions_data_type_id_fkey" FOREIGN KEY ("data_type_id") REFERENCES "qc_data_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_parameters" ADD CONSTRAINT "qc_parameters_data_type_id_fkey" FOREIGN KEY ("data_type_id") REFERENCES "qc_data_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
