/*
  Warnings:

  - You are about to drop the column `auxiliaries_total_cost` on the `pricing_template_finished_products` table. All the data in the column will be lost.
  - You are about to drop the column `consumer_price` on the `pricing_template_finished_products` table. All the data in the column will be lost.
  - You are about to drop the column `finished_product_total_cost` on the `pricing_template_finished_products` table. All the data in the column will be lost.
  - You are about to drop the column `product_fill_cost` on the `pricing_template_finished_products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pricing_template_finished_products" DROP COLUMN "auxiliaries_total_cost",
DROP COLUMN "consumer_price",
DROP COLUMN "finished_product_total_cost",
DROP COLUMN "product_fill_cost";
