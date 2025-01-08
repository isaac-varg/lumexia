-- CreateTable
CREATE TABLE "item_cost_determinations" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "item_pricing_data_id" TEXT NOT NULL,
    "item_cost" DOUBLE PRECISION NOT NULL,
    "upcoming_cost_used" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_cost_determinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_pricing_data" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "arrival_cost" DOUBLE PRECISION NOT NULL,
    "productionUsageCost" DOUBLE PRECISION NOT NULL,
    "unforeseen_difficulties_cost" DOUBLE PRECISION NOT NULL,
    "isUpcomingPriceActive" BOOLEAN NOT NULL,
    "upcomingPrice" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pricing_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item_cost_determinations" ADD CONSTRAINT "item_cost_determinations_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_cost_determinations" ADD CONSTRAINT "item_cost_determinations_item_pricing_data_id_fkey" FOREIGN KEY ("item_pricing_data_id") REFERENCES "item_pricing_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pricing_data" ADD CONSTRAINT "item_pricing_data_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
