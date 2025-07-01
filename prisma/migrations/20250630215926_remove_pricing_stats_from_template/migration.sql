/*
  Warnings:

  - You are about to drop the column `markup` on the `pricing_template_finished_products` table. All the data in the column will be lost.
  - You are about to drop the column `profit` on the `pricing_template_finished_products` table. All the data in the column will be lost.
  - You are about to drop the column `profit_percentage` on the `pricing_template_finished_products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pricing_template_finished_products" DROP COLUMN "markup",
DROP COLUMN "profit",
DROP COLUMN "profit_percentage";
