/*
  Warnings:

  - You are about to drop the column `uom_id` on the `qc_parameters` table. All the data in the column will be lost.
  - You are about to drop the `qc_uoms` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `uom` to the `qc_parameters` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "qc_parameters" DROP CONSTRAINT "qc_parameters_uom_id_fkey";

-- AlterTable
ALTER TABLE "qc_parameters" DROP COLUMN "uom_id",
ADD COLUMN     "uom" TEXT NOT NULL;

-- DropTable
DROP TABLE "qc_uoms";
