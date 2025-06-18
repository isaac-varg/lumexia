/*
  Warnings:

  - You are about to drop the `_QcParameterToQcParameterGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QcParameterToQcParameterGroup" DROP CONSTRAINT "_QcParameterToQcParameterGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_QcParameterToQcParameterGroup" DROP CONSTRAINT "_QcParameterToQcParameterGroup_B_fkey";

-- AlterTable
ALTER TABLE "qc_parameter_groups" ADD COLUMN     "qcParameterId" TEXT;

-- DropTable
DROP TABLE "_QcParameterToQcParameterGroup";

-- AddForeignKey
ALTER TABLE "qc_parameter_groups" ADD CONSTRAINT "qc_parameter_groups_qcParameterId_fkey" FOREIGN KEY ("qcParameterId") REFERENCES "qc_parameters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
