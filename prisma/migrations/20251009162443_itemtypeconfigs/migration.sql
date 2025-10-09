-- CreateTable
CREATE TABLE "item_type_configs" (
    "id" TEXT NOT NULL,
    "is_pricing_examination_trigger_enabled" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "item_type_id" TEXT NOT NULL,

    CONSTRAINT "item_type_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_type_configs_item_type_id_key" ON "item_type_configs"("item_type_id");

-- AddForeignKey
ALTER TABLE "item_type_configs" ADD CONSTRAINT "item_type_configs_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "item_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
