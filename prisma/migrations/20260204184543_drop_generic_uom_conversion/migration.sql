/*
  Warnings:

  - You are about to drop the `generic_unit_conversion_factors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "generic_unit_conversion_factors" DROP CONSTRAINT "generic_unit_conversion_factors_convert_to_uom_id_fkey";

-- DropForeignKey
ALTER TABLE "generic_unit_conversion_factors" DROP CONSTRAINT "generic_unit_conversion_factors_item_id_fkey";

-- DropForeignKey
ALTER TABLE "generic_unit_conversion_factors" DROP CONSTRAINT "generic_unit_conversion_factors_supplier_id_fkey";

-- DropTable
DROP TABLE "generic_unit_conversion_factors";
