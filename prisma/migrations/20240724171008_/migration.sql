/*
  Warnings:

  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseOrderNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupplierContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupplierContactNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupplierNote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchaseOrderNote" DROP CONSTRAINT "PurchaseOrderNote_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrderNote" DROP CONSTRAINT "PurchaseOrderNote_userId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierContact" DROP CONSTRAINT "SupplierContact_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "SupplierContactNote" DROP CONSTRAINT "SupplierContactNote_supplier_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "SupplierNote" DROP CONSTRAINT "SupplierNote_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "purchase_orders" DROP CONSTRAINT "purchase_orders_payment_method_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier_payment_methods" DROP CONSTRAINT "supplier_payment_methods_payment_method_id_fkey";

-- DropTable
DROP TABLE "PaymentMethod";

-- DropTable
DROP TABLE "PurchaseOrderNote";

-- DropTable
DROP TABLE "SupplierContact";

-- DropTable
DROP TABLE "SupplierContactNote";

-- DropTable
DROP TABLE "SupplierNote";

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "limit" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order_notes" (
    "id" TEXT NOT NULL,
    "purchaseOrderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_order_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_contact_notes" (
    "id" TEXT NOT NULL,
    "supplier_contact_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_contact_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_contacts" (
    "id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_notes" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchase_order_notes" ADD CONSTRAINT "purchase_order_notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_notes" ADD CONSTRAINT "purchase_order_notes_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_contact_notes" ADD CONSTRAINT "supplier_contact_notes_supplier_contact_id_fkey" FOREIGN KEY ("supplier_contact_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_contacts" ADD CONSTRAINT "supplier_contacts_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_notes" ADD CONSTRAINT "supplier_notes_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_payment_methods" ADD CONSTRAINT "supplier_payment_methods_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
