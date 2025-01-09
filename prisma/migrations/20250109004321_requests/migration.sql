-- AlterTable
ALTER TABLE "batch_production_records" ADD COLUMN     "requestInventorySnapshotId" TEXT;

-- AlterTable
ALTER TABLE "purchase_orders" ADD COLUMN     "requestInventorySnapshotId" TEXT;

-- CreateTable
CREATE TABLE "purchasing_requests" (
    "id" TEXT NOT NULL,
    "status_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchasing_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_inventory_snapshots" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "object_name" TEXT NOT NULL,
    "on_hand_quantity" DOUBLE PRECISION NOT NULL,
    "allocated_quantity" DOUBLE PRECISION NOT NULL,
    "available_quantity" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_inventory_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "batch_production_records" ADD CONSTRAINT "batch_production_records_requestInventorySnapshotId_fkey" FOREIGN KEY ("requestInventorySnapshotId") REFERENCES "request_inventory_snapshots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_requestInventorySnapshotId_fkey" FOREIGN KEY ("requestInventorySnapshotId") REFERENCES "request_inventory_snapshots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchasing_requests" ADD CONSTRAINT "purchasing_requests_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "request_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchasing_requests" ADD CONSTRAINT "purchasing_requests_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_inventory_snapshots" ADD CONSTRAINT "request_inventory_snapshots_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "purchasing_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
