-- CreateTable
CREATE TABLE "pricing_template_auxiliary" (
    "id" TEXT NOT NULL,
    "apart_of_pricing_template_finished_product_id" TEXT NOT NULL,
    "auxiliary_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "difficulty_adjustment_cost" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_template_auxiliary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_template_finished_products" (
    "id" TEXT NOT NULL,
    "apart_of_pricing_template_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fill_quantity" DOUBLE PRECISION NOT NULL,
    "declared_quantity" DOUBLE PRECISION NOT NULL,
    "free_shipping_cost" DOUBLE PRECISION NOT NULL,
    "fill_uom_id" TEXT NOT NULL,
    "difficulty_adjustment_cost" DOUBLE PRECISION NOT NULL,
    "finished_product_total_cost" DOUBLE PRECISION NOT NULL,
    "auxiliaries_total_cost" DOUBLE PRECISION NOT NULL,
    "product_fill_cost" DOUBLE PRECISION NOT NULL,
    "consumer_price" DOUBLE PRECISION NOT NULL,
    "markup" DOUBLE PRECISION NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,
    "profit_percentage" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_template_finished_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "for_item_type_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_template_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pricing_template_auxiliary" ADD CONSTRAINT "pricing_template_auxiliary_apart_of_pricing_template_finis_fkey" FOREIGN KEY ("apart_of_pricing_template_finished_product_id") REFERENCES "pricing_template_finished_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_template_auxiliary" ADD CONSTRAINT "pricing_template_auxiliary_auxiliary_item_id_fkey" FOREIGN KEY ("auxiliary_item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_template_finished_products" ADD CONSTRAINT "pricing_template_finished_products_apart_of_pricing_templa_fkey" FOREIGN KEY ("apart_of_pricing_template_id") REFERENCES "pricing_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_template_finished_products" ADD CONSTRAINT "pricing_template_finished_products_fill_uom_id_fkey" FOREIGN KEY ("fill_uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_template" ADD CONSTRAINT "pricing_template_for_item_type_id_fkey" FOREIGN KEY ("for_item_type_id") REFERENCES "item_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
