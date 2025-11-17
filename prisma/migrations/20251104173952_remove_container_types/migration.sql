/*
  Warnings:

  - You are about to drop the column `container_type_id` on the `purchase_order_item_details` table. All the data in the column will be lost.
  - You are about to drop the column `quantity_of_containers` on the `purchase_order_item_details` table. All the data in the column will be lost.
  - You are about to drop the column `weight_per_container` on the `purchase_order_item_details` table. All the data in the column will be lost.
  - You are about to drop the column `weight_uom_id` on the `purchase_order_item_details` table. All the data in the column will be lost.
  - You are about to drop the `container_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `containers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "containers" DROP CONSTRAINT "containers_container_type_id_fkey";

-- DropForeignKey
ALTER TABLE "containers" DROP CONSTRAINT "containers_lot_id_fkey";

-- DropForeignKey
ALTER TABLE "containers" DROP CONSTRAINT "containers_uom_id_fkey";

-- DropForeignKey
ALTER TABLE "purchase_order_item_details" DROP CONSTRAINT "purchase_order_item_details_container_type_id_fkey";

-- DropForeignKey
ALTER TABLE "purchase_order_item_details" DROP CONSTRAINT "purchase_order_item_details_weight_uom_id_fkey";

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "record_status_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "purchase_order_item_details" DROP COLUMN "container_type_id",
DROP COLUMN "quantity_of_containers",
DROP COLUMN "weight_per_container",
DROP COLUMN "weight_uom_id";

-- DropTable
DROP TABLE "container_types";

-- DropTable
DROP TABLE "containers";
