-- CreateTable
CREATE TABLE "consumer_containers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "container_cost" DOUBLE PRECISION NOT NULL,
    "fill_labor_cost" DOUBLE PRECISION NOT NULL,
    "shipping_cost" DOUBLE PRECISION NOT NULL,
    "free_shipping_cost" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consumer_containers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_consumer_containers" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "consumer_container_id" TEXT NOT NULL,
    "fill_quantity" DOUBLE PRECISION NOT NULL,
    "declared_quantity" DOUBLE PRECISION NOT NULL,
    "uom_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_consumer_containers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item_consumer_containers" ADD CONSTRAINT "item_consumer_containers_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_consumer_containers" ADD CONSTRAINT "item_consumer_containers_consumer_container_id_fkey" FOREIGN KEY ("consumer_container_id") REFERENCES "consumer_containers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_consumer_containers" ADD CONSTRAINT "item_consumer_containers_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
