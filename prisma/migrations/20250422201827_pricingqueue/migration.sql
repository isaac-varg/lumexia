-- CreateTable
CREATE TABLE "pricing_queue" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_queue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pricing_queue" ADD CONSTRAINT "pricing_queue_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
