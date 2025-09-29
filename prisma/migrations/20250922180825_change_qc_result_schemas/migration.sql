/*
  Warnings:

  - You are about to drop the column `calculated_specification` on the `qc_item_parameters` table. All the data in the column will be lost.
  - You are about to drop the column `specification` on the `qc_item_parameters` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `qc_parameter_results` table. All the data in the column will be lost.
  - You are about to drop the column `results_data` on the `qc_parameter_results` table. All the data in the column will be lost.
  - You are about to drop the column `coa_parsed_data` on the `qc_records` table. All the data in the column will be lost.
  - You are about to drop the column `coa_public_document_url` on the `qc_records` table. All the data in the column will be lost.
  - You are about to drop the column `coa_supplier_document_url` on the `qc_records` table. All the data in the column will be lost.
  - Added the required column `value` to the `qc_parameter_results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "qc_item_parameters" DROP COLUMN "calculated_specification",
DROP COLUMN "specification";

-- AlterTable
ALTER TABLE "qc_parameter_results" DROP COLUMN "note",
DROP COLUMN "results_data",
ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "qc_records" DROP COLUMN "coa_parsed_data",
DROP COLUMN "coa_public_document_url",
DROP COLUMN "coa_supplier_document_url";

-- CreateTable
CREATE TABLE "qc_parameter_input_results" (
    "id" TEXT NOT NULL,
    "qc_result_id" TEXT NOT NULL,
    "parameter_input_definition_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_parameter_input_results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "qc_parameter_input_results" ADD CONSTRAINT "qc_parameter_input_results_qc_result_id_fkey" FOREIGN KEY ("qc_result_id") REFERENCES "qc_parameter_results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_parameter_input_results" ADD CONSTRAINT "qc_parameter_input_results_parameter_input_definition_id_fkey" FOREIGN KEY ("parameter_input_definition_id") REFERENCES "qc_parameter_input_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
