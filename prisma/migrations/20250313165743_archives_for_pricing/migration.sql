-- AlterTable
ALTER TABLE "item_consumer_containers" ADD COLUMN     "consumerContainerArchiveId" TEXT,
ALTER COLUMN "record_status_id" SET DEFAULT 'd7b0a804-52c6-4586-b4f4-0fe49895f794';

-- CreateTable
CREATE TABLE "consumer_containers_archives" (
    "id" TEXT NOT NULL,
    "examination_id" TEXT NOT NULL,
    "current_consumer_container_id" TEXT NOT NULL,
    "container_item_id" TEXT NOT NULL,
    "container_cost" DOUBLE PRECISION NOT NULL,
    "fill_labor_cost" DOUBLE PRECISION NOT NULL,
    "shipping_cost" DOUBLE PRECISION NOT NULL,
    "free_shipping_cost" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consumer_containers_archives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_consumer_container_archives" (
    "id" TEXT NOT NULL,
    "examination_id" TEXT NOT NULL,
    "current_item_consumer_container_id" TEXT NOT NULL,
    "consumer_container_id" TEXT NOT NULL,
    "fill_quantity" DOUBLE PRECISION NOT NULL,
    "declared_quantity" DOUBLE PRECISION NOT NULL,
    "difficulties_cost" DOUBLE PRECISION NOT NULL,
    "uom_id" TEXT NOT NULL,
    "consumer_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_consumer_container_archives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_pricing_data_archives" (
    "id" TEXT NOT NULL,
    "examination_id" TEXT NOT NULL,
    "current_item_pricing_data_id" TEXT NOT NULL,
    "arrival_cost" DOUBLE PRECISION NOT NULL,
    "productionUsageCost" DOUBLE PRECISION NOT NULL,
    "unforeseen_difficulties_cost" DOUBLE PRECISION NOT NULL,
    "isUpcomingPriceActive" BOOLEAN NOT NULL,
    "upcomingPrice" DOUBLE PRECISION NOT NULL,
    "upcoming_price_uom_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pricing_data_archives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_examination_validations" (
    "id" TEXT NOT NULL,
    "examination_id" TEXT NOT NULL,
    "all_containers_reviewed" BOOLEAN NOT NULL,
    "all_containers_exceed_profit_threshold" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_examination_validations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "consumer_containers_archives" ADD CONSTRAINT "consumer_containers_archives_container_item_id_fkey" FOREIGN KEY ("container_item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumer_containers_archives" ADD CONSTRAINT "consumer_containers_archives_examination_id_fkey" FOREIGN KEY ("examination_id") REFERENCES "pricing_examinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumer_containers_archives" ADD CONSTRAINT "consumer_containers_archives_current_consumer_container_id_fkey" FOREIGN KEY ("current_consumer_container_id") REFERENCES "consumer_containers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_consumer_container_archives" ADD CONSTRAINT "item_consumer_container_archives_consumer_container_id_fkey" FOREIGN KEY ("consumer_container_id") REFERENCES "consumer_containers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_consumer_container_archives" ADD CONSTRAINT "item_consumer_container_archives_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_consumer_container_archives" ADD CONSTRAINT "item_consumer_container_archives_examination_id_fkey" FOREIGN KEY ("examination_id") REFERENCES "pricing_examinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_consumer_container_archives" ADD CONSTRAINT "item_consumer_container_archives_current_item_consumer_con_fkey" FOREIGN KEY ("current_item_consumer_container_id") REFERENCES "item_consumer_containers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_consumer_containers" ADD CONSTRAINT "item_consumer_containers_consumerContainerArchiveId_fkey" FOREIGN KEY ("consumerContainerArchiveId") REFERENCES "consumer_containers_archives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pricing_data_archives" ADD CONSTRAINT "item_pricing_data_archives_upcoming_price_uom_id_fkey" FOREIGN KEY ("upcoming_price_uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pricing_data_archives" ADD CONSTRAINT "item_pricing_data_archives_examination_id_fkey" FOREIGN KEY ("examination_id") REFERENCES "pricing_examinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pricing_data_archives" ADD CONSTRAINT "item_pricing_data_archives_current_item_pricing_data_id_fkey" FOREIGN KEY ("current_item_pricing_data_id") REFERENCES "item_pricing_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_examination_validations" ADD CONSTRAINT "pricing_examination_validations_examination_id_fkey" FOREIGN KEY ("examination_id") REFERENCES "pricing_examinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
