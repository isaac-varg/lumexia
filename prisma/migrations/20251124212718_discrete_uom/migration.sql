-- CreateTable
CREATE TABLE "discrete_unit_of_measurement_conversions" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "uom_a_id" TEXT NOT NULL,
    "uom_b_id" TEXT NOT NULL,
    "conversion_factor" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discrete_unit_of_measurement_conversions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discrete_unit_of_measurement_conversions_item_id_supplier_i_key" ON "discrete_unit_of_measurement_conversions"("item_id", "supplier_id");

-- AddForeignKey
ALTER TABLE "discrete_unit_of_measurement_conversions" ADD CONSTRAINT "discrete_unit_of_measurement_conversions_uom_a_id_fkey" FOREIGN KEY ("uom_a_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrete_unit_of_measurement_conversions" ADD CONSTRAINT "discrete_unit_of_measurement_conversions_uom_b_id_fkey" FOREIGN KEY ("uom_b_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrete_unit_of_measurement_conversions" ADD CONSTRAINT "discrete_unit_of_measurement_conversions_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrete_unit_of_measurement_conversions" ADD CONSTRAINT "discrete_unit_of_measurement_conversions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
