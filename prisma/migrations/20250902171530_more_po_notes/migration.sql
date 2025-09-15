-- AlterTable
ALTER TABLE "purchase_order_notes" ADD COLUMN     "note_type_id" TEXT NOT NULL DEFAULT '61dc5d6a-dbce-4372-95aa-17b463ec4d2b';

-- CreateTable
CREATE TABLE "po_public_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_public_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_public_notes" (
    "id" TEXT NOT NULL,
    "purchase_order_id" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_public_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_supplier_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_supplier_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_supplier_notes" (
    "id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_supplier_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_order_note_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "po_public_notes" ADD CONSTRAINT "po_public_notes_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_public_notes" ADD CONSTRAINT "po_public_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_public_notes" ADD CONSTRAINT "po_public_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "po_public_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_supplier_notes" ADD CONSTRAINT "po_supplier_notes_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_supplier_notes" ADD CONSTRAINT "po_supplier_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_supplier_notes" ADD CONSTRAINT "po_supplier_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "po_supplier_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_notes" ADD CONSTRAINT "purchase_order_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "purchase_order_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
