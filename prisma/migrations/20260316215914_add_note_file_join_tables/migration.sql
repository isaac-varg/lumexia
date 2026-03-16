-- CreateTable
CREATE TABLE "po_accounting_note_files" (
    "id" TEXT NOT NULL,
    "po_accounting_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_accounting_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_examination_note_files" (
    "id" TEXT NOT NULL,
    "pricing_examination_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_examination_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_request_note_files" (
    "id" TEXT NOT NULL,
    "audit_request_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audit_request_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discrepancy_audit_item_note_files" (
    "id" TEXT NOT NULL,
    "discrepancy_audit_item_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discrepancy_audit_item_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lot_note_files" (
    "id" TEXT NOT NULL,
    "lot_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lot_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_note_files" (
    "id" TEXT NOT NULL,
    "item_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bpr_note_files" (
    "id" TEXT NOT NULL,
    "bpr_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_request_note_files" (
    "id" TEXT NOT NULL,
    "general_request_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "general_request_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_public_note_files" (
    "id" TEXT NOT NULL,
    "po_public_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_public_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_supplier_note_files" (
    "id" TEXT NOT NULL,
    "po_supplier_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_supplier_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order_note_files" (
    "id" TEXT NOT NULL,
    "purchase_order_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_order_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_note_files" (
    "id" TEXT NOT NULL,
    "request_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_record_note_files" (
    "id" TEXT NOT NULL,
    "qc_record_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_record_note_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "po_accounting_note_files" ADD CONSTRAINT "po_accounting_note_files_po_accounting_note_id_fkey" FOREIGN KEY ("po_accounting_note_id") REFERENCES "po_accounting_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_accounting_note_files" ADD CONSTRAINT "po_accounting_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_examination_note_files" ADD CONSTRAINT "pricing_examination_note_files_pricing_examination_note_id_fkey" FOREIGN KEY ("pricing_examination_note_id") REFERENCES "pricing_examination_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_examination_note_files" ADD CONSTRAINT "pricing_examination_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_request_note_files" ADD CONSTRAINT "audit_request_note_files_audit_request_note_id_fkey" FOREIGN KEY ("audit_request_note_id") REFERENCES "audit_request_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_request_note_files" ADD CONSTRAINT "audit_request_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audit_item_note_files" ADD CONSTRAINT "discrepancy_audit_item_note_files_discrepancy_audit_item_n_fkey" FOREIGN KEY ("discrepancy_audit_item_note_id") REFERENCES "discrepancy_audit_item_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audit_item_note_files" ADD CONSTRAINT "discrepancy_audit_item_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_note_files" ADD CONSTRAINT "lot_note_files_lot_note_id_fkey" FOREIGN KEY ("lot_note_id") REFERENCES "lot_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_note_files" ADD CONSTRAINT "lot_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_note_files" ADD CONSTRAINT "item_note_files_item_note_id_fkey" FOREIGN KEY ("item_note_id") REFERENCES "item_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_note_files" ADD CONSTRAINT "item_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_note_files" ADD CONSTRAINT "bpr_note_files_bpr_note_id_fkey" FOREIGN KEY ("bpr_note_id") REFERENCES "bpr_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_note_files" ADD CONSTRAINT "bpr_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_request_note_files" ADD CONSTRAINT "general_request_note_files_general_request_note_id_fkey" FOREIGN KEY ("general_request_note_id") REFERENCES "general_request_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_request_note_files" ADD CONSTRAINT "general_request_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_public_note_files" ADD CONSTRAINT "po_public_note_files_po_public_note_id_fkey" FOREIGN KEY ("po_public_note_id") REFERENCES "po_public_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_public_note_files" ADD CONSTRAINT "po_public_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_supplier_note_files" ADD CONSTRAINT "po_supplier_note_files_po_supplier_note_id_fkey" FOREIGN KEY ("po_supplier_note_id") REFERENCES "po_supplier_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_supplier_note_files" ADD CONSTRAINT "po_supplier_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_note_files" ADD CONSTRAINT "purchase_order_note_files_purchase_order_note_id_fkey" FOREIGN KEY ("purchase_order_note_id") REFERENCES "purchase_order_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_note_files" ADD CONSTRAINT "purchase_order_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_note_files" ADD CONSTRAINT "request_note_files_request_note_id_fkey" FOREIGN KEY ("request_note_id") REFERENCES "request_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_note_files" ADD CONSTRAINT "request_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_record_note_files" ADD CONSTRAINT "qc_record_note_files_qc_record_note_id_fkey" FOREIGN KEY ("qc_record_note_id") REFERENCES "qc_record_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_record_note_files" ADD CONSTRAINT "qc_record_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
