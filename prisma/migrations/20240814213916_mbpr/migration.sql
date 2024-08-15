-- CreateTable
CREATE TABLE "record_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "record_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_batch_production_records" (
    "id" TEXT NOT NULL,
    "produces_item_id" TEXT NOT NULL,
    "record_status_id" TEXT NOT NULL,
    "version_label" TEXT,
    "estimatedTotalTime" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_batch_production_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "master_batch_production_records" ADD CONSTRAINT "master_batch_production_records_produces_item_id_fkey" FOREIGN KEY ("produces_item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_batch_production_records" ADD CONSTRAINT "master_batch_production_records_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
