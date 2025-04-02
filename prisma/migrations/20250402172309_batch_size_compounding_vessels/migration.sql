-- CreateTable
CREATE TABLE "batch_size_compounding_vessels" (
    "id" TEXT NOT NULL,
    "tank_time" DOUBLE PRECISION NOT NULL,
    "compounding_vessel_id" TEXT NOT NULL,
    "batch_size_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batch_size_compounding_vessels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "batch_size_compounding_vessels" ADD CONSTRAINT "batch_size_compounding_vessels_compounding_vessel_id_fkey" FOREIGN KEY ("compounding_vessel_id") REFERENCES "compounding_vessels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch_size_compounding_vessels" ADD CONSTRAINT "batch_size_compounding_vessels_batch_size_id_fkey" FOREIGN KEY ("batch_size_id") REFERENCES "batch_sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
