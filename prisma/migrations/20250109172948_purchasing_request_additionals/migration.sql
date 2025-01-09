/*
  Warnings:

  - Added the required column `priority_id` to the `purchasing_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notion_bprs" ADD COLUMN     "purchasingRequestId" TEXT;

-- AlterTable
ALTER TABLE "purchasing_requests" ADD COLUMN     "priority_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "notion_purchase_orders" (
    "id" TEXT NOT NULL,
    "notion_page_id" TEXT NOT NULL,
    "lumexia_po_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notion_purchase_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notion_purchasing_requests" (
    "id" TEXT NOT NULL,
    "notion_page_id" TEXT NOT NULL,
    "lumexia_purchasing_request_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notion_purchasing_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_bprs" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "bpr_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_bprs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_priorities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_priorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_purchase_orders" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "po_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_purchase_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notion_bprs" ADD CONSTRAINT "notion_bprs_purchasingRequestId_fkey" FOREIGN KEY ("purchasingRequestId") REFERENCES "purchasing_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notion_purchase_orders" ADD CONSTRAINT "notion_purchase_orders_lumexia_po_id_fkey" FOREIGN KEY ("lumexia_po_id") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notion_purchasing_requests" ADD CONSTRAINT "notion_purchasing_requests_lumexia_purchasing_request_id_fkey" FOREIGN KEY ("lumexia_purchasing_request_id") REFERENCES "purchasing_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchasing_requests" ADD CONSTRAINT "purchasing_requests_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "request_priorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_bprs" ADD CONSTRAINT "request_bprs_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "purchasing_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_bprs" ADD CONSTRAINT "request_bprs_bpr_id_fkey" FOREIGN KEY ("bpr_id") REFERENCES "batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_purchase_orders" ADD CONSTRAINT "request_purchase_orders_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "purchasing_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_purchase_orders" ADD CONSTRAINT "request_purchase_orders_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
