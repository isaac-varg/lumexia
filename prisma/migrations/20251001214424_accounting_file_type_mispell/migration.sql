/*
  Warnings:

  - You are about to drop the column `abbreviaton` on the `po_accounting_file_types` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "po_accounting_file_types" DROP COLUMN "abbreviaton",
ADD COLUMN     "abbreviation" TEXT;
