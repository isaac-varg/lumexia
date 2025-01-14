/*
  Warnings:

  - You are about to drop the column `requestInventorySnapshotId` on the `batch_production_records` table. All the data in the column will be lost.
  - You are about to drop the column `requestInventorySnapshotId` on the `purchase_orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "batch_production_records" DROP CONSTRAINT "batch_production_records_requestInventorySnapshotId_fkey";

-- DropForeignKey
ALTER TABLE "purchase_orders" DROP CONSTRAINT "purchase_orders_requestInventorySnapshotId_fkey";

-- AlterTable
ALTER TABLE "batch_production_records" DROP COLUMN "requestInventorySnapshotId";

-- AlterTable
ALTER TABLE "purchase_orders" DROP COLUMN "requestInventorySnapshotId";

-- AlterTable
ALTER TABLE "request_inventory_snapshots" ADD COLUMN     "allocatedBprIds" TEXT[],
ADD COLUMN     "pendingPoIds" TEXT[];
