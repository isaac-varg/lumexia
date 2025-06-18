/*
  Warnings:

  - You are about to drop the column `qcParameterId` on the `qc_parameter_groups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "qc_parameter_groups" DROP CONSTRAINT "qc_parameter_groups_qcParameterId_fkey";

-- AlterTable
ALTER TABLE "qc_parameter_groups" DROP COLUMN "qcParameterId";
