-- CreateTable
CREATE TABLE "PurchaseOrderNote" (
    "id" TEXT NOT NULL,
    "purchaseOrderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "PurchaseOrderNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseOrderNote" ADD CONSTRAINT "PurchaseOrderNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderNote" ADD CONSTRAINT "PurchaseOrderNote_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
