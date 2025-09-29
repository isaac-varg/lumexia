/*
  Warnings:

  - You are about to drop the column `qc_parameter_id` on the `qc_parameter_results` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[qc_record_id,qc_item_parameter_id]` on the table `qc_parameter_results` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `qc_item_parameter_id` to the `qc_parameter_results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "qc_parameter_results" DROP CONSTRAINT "qc_parameter_results_qc_parameter_id_fkey";

-- AlterTable
ALTER TABLE "qc_parameter_results" DROP COLUMN "qc_parameter_id",
ADD COLUMN     "qcParameterId" TEXT,
ADD COLUMN     "qc_item_parameter_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "qc_parameter_results_qc_record_id_qc_item_parameter_id_key" ON "qc_parameter_results"("qc_record_id", "qc_item_parameter_id");

-- AddForeignKey
ALTER TABLE "qc_parameter_results" ADD CONSTRAINT "qc_parameter_results_qc_item_parameter_id_fkey" FOREIGN KEY ("qc_item_parameter_id") REFERENCES "qc_item_parameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_parameter_results" ADD CONSTRAINT "qc_parameter_results_qcParameterId_fkey" FOREIGN KEY ("qcParameterId") REFERENCES "qc_parameters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
