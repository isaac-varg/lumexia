-- CreateTable
CREATE TABLE "po_accounting_details" (
    "id" TEXT NOT NULL,
    "status_id" TEXT NOT NULL,
    "purchase_order_id" TEXT NOT NULL,
    "paid" BOOLEAN,
    "payment_method_id" TEXT,
    "packing_slip_received" BOOLEAN,
    "paperwork_given_to_admin" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_accounting_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_accounting_file_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviaton" TEXT,
    "description" TEXT,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_accounting_file_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_accounting_files" (
    "id" TEXT NOT NULL,
    "file_type_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "purchase_order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_accounting_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_accounting_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_accounting_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_accounting_notes" (
    "id" TEXT NOT NULL,
    "purchase_order_id" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_accounting_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_accounting_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sequence" INTEGER NOT NULL,
    "bg_color" TEXT NOT NULL DEFAULT '#333333',
    "text_color" TEXT NOT NULL DEFAULT '#ffffff',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_accounting_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "po_accounting_statuses_sequence_key" ON "po_accounting_statuses"("sequence");

-- AddForeignKey
ALTER TABLE "po_accounting_details" ADD CONSTRAINT "po_accounting_details_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "po_accounting_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_accounting_details" ADD CONSTRAINT "po_accounting_details_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_accounting_details" ADD CONSTRAINT "po_accounting_details_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_accounting_files" ADD CONSTRAINT "po_accounting_files_file_type_id_fkey" FOREIGN KEY ("file_type_id") REFERENCES "po_accounting_file_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_accounting_files" ADD CONSTRAINT "po_accounting_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_accounting_files" ADD CONSTRAINT "po_accounting_files_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_accounting_notes" ADD CONSTRAINT "po_accounting_notes_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_accounting_notes" ADD CONSTRAINT "po_accounting_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_accounting_notes" ADD CONSTRAINT "po_accounting_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "po_accounting_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
