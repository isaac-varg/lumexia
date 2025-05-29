-- CreateTable
CREATE TABLE "generic_unit_conversion_factors" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "convert_to_uom_id" TEXT NOT NULL,
    "conversion_factor" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "generic_unit_conversion_factors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "generic_unit_conversion_factors_item_id_supplier_id_key" ON "generic_unit_conversion_factors"("item_id", "supplier_id");

-- AddForeignKey
ALTER TABLE "generic_unit_conversion_factors" ADD CONSTRAINT "generic_unit_conversion_factors_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generic_unit_conversion_factors" ADD CONSTRAINT "generic_unit_conversion_factors_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generic_unit_conversion_factors" ADD CONSTRAINT "generic_unit_conversion_factors_convert_to_uom_id_fkey" FOREIGN KEY ("convert_to_uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
