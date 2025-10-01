/*
  Warnings:

  - You are about to drop the column `abbreviaton` on the `qc_record_file_types` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "qc_record_file_types" DROP COLUMN "abbreviaton",
ADD COLUMN     "abbreviation" TEXT;
