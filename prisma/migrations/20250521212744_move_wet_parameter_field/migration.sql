/*
  Warnings:

  - You are about to drop the column `is_wet_parameter` on the `qc_item_parameters` table. All the data in the column will be lost.
  - Added the required column `is_wet_parameter` to the `qc_parameters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "qc_item_parameters" DROP COLUMN "is_wet_parameter";

-- AlterTable
ALTER TABLE "qc_parameters" ADD COLUMN     "is_wet_parameter" BOOLEAN NOT NULL;
