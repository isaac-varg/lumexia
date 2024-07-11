-- CreateTable
CREATE TABLE "LotOrigin" (
    "id" TEXT NOT NULL,
    "purchaseOrderId" TEXT NOT NULL,
    "originType" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LotOrigin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LotOrigin" ADD CONSTRAINT "LotOrigin_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
