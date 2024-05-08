-- AlterTable
ALTER TABLE "items" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "purchase_order_items" (
    "id" TEXT NOT NULL,
    "purchase_order_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price_per_unit" DOUBLE PRECISION NOT NULL,
    "uom_id" TEXT NOT NULL,
    "purchase_order_status_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_orders" (
    "id" TEXT NOT NULL,
    "reference_code" SERIAL NOT NULL,
    "submitting_user_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "status_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order_status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "purchase_order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_aliases" (
    "id" TEXT NOT NULL,
    "alias_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,

    CONSTRAINT "supplier_aliases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address_street1" TEXT NOT NULL,
    "address_street2" TEXT,
    "address_city" TEXT NOT NULL,
    "address_state" TEXT NOT NULL,
    "address_zip" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchase_order_items" ADD CONSTRAINT "purchase_order_items_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_items" ADD CONSTRAINT "purchase_order_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_items" ADD CONSTRAINT "purchase_order_items_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_items" ADD CONSTRAINT "purchase_order_items_purchase_order_status_id_fkey" FOREIGN KEY ("purchase_order_status_id") REFERENCES "purchase_order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_submitting_user_id_fkey" FOREIGN KEY ("submitting_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "purchase_order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_aliases" ADD CONSTRAINT "supplier_aliases_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_aliases" ADD CONSTRAINT "supplier_aliases_alias_id_fkey" FOREIGN KEY ("alias_id") REFERENCES "aliases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
