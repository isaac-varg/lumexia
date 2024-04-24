/*
  Warnings:

  - Added the required column `abbreviation` to the `units_of_measurement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "units_of_measurement" ADD COLUMN     "abbreviation" TEXT NOT NULL;
