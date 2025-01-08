-- CreateTable
CREATE TABLE "compounding_vessels" (
    "id" TEXT NOT NULL,
    "equipment_id" TEXT NOT NULL,
    "capacity" DOUBLE PRECISION NOT NULL,
    "operational_cost" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compounding_vessels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "compounding_vessels" ADD CONSTRAINT "compounding_vessels_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
