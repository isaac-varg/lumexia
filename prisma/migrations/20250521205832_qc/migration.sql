-- CreateTable
CREATE TABLE "qc_audit_logs" (
    "id" TEXT NOT NULL,
    "qc_record_id" TEXT NOT NULL,
    "edited_by_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "edited_table_name" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "field_name" TEXT NOT NULL,
    "old_value" TEXT NOT NULL,
    "new_value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_item_parameters" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "parameter_id" TEXT NOT NULL,
    "is_wet_parameter" BOOLEAN NOT NULL,
    "specification" JSONB,
    "calculated_specification" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_item_parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_parameter_results" (
    "id" TEXT NOT NULL,
    "qc_record_id" TEXT NOT NULL,
    "qc_parameter_id" TEXT NOT NULL,
    "results_data" JSONB NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_parameter_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_parameters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uom_id" TEXT NOT NULL,
    "data_type" TEXT NOT NULL,
    "description" TEXT,
    "inputDefinition" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_record_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_record_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_record_notes" (
    "id" TEXT NOT NULL,
    "qc_record_id" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_record_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_record_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "description" TEXT,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_record_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_records" (
    "id" TEXT NOT NULL,
    "conducted_by_id" TEXT NOT NULL,
    "status_id" TEXT NOT NULL,
    "examination_type" TEXT NOT NULL,
    "examined_lot_id" TEXT NOT NULL,
    "linked_bpr_id" TEXT,
    "linked_purchase_order_item_id" TEXT,
    "coa_supplier_document_url" TEXT,
    "coa_public_document_url" TEXT,
    "coa_parsed_data" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_uoms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_uoms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "qc_item_parameters_item_id_parameter_id_key" ON "qc_item_parameters"("item_id", "parameter_id");

-- CreateIndex
CREATE UNIQUE INDEX "qc_record_statuses_sequence_key" ON "qc_record_statuses"("sequence");

-- AddForeignKey
ALTER TABLE "qc_audit_logs" ADD CONSTRAINT "qc_audit_logs_qc_record_id_fkey" FOREIGN KEY ("qc_record_id") REFERENCES "qc_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_audit_logs" ADD CONSTRAINT "qc_audit_logs_edited_by_id_fkey" FOREIGN KEY ("edited_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_item_parameters" ADD CONSTRAINT "qc_item_parameters_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_item_parameters" ADD CONSTRAINT "qc_item_parameters_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "qc_parameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_parameter_results" ADD CONSTRAINT "qc_parameter_results_qc_record_id_fkey" FOREIGN KEY ("qc_record_id") REFERENCES "qc_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_parameter_results" ADD CONSTRAINT "qc_parameter_results_qc_parameter_id_fkey" FOREIGN KEY ("qc_parameter_id") REFERENCES "qc_parameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_parameters" ADD CONSTRAINT "qc_parameters_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "qc_uoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_record_notes" ADD CONSTRAINT "qc_record_notes_qc_record_id_fkey" FOREIGN KEY ("qc_record_id") REFERENCES "qc_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_record_notes" ADD CONSTRAINT "qc_record_notes_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_record_notes" ADD CONSTRAINT "qc_record_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "qc_record_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_records" ADD CONSTRAINT "qc_records_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "qc_record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_records" ADD CONSTRAINT "qc_records_conducted_by_id_fkey" FOREIGN KEY ("conducted_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_records" ADD CONSTRAINT "qc_records_examined_lot_id_fkey" FOREIGN KEY ("examined_lot_id") REFERENCES "lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_records" ADD CONSTRAINT "qc_records_linked_purchase_order_item_id_fkey" FOREIGN KEY ("linked_purchase_order_item_id") REFERENCES "purchase_order_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_records" ADD CONSTRAINT "qc_records_linked_bpr_id_fkey" FOREIGN KEY ("linked_bpr_id") REFERENCES "batch_production_records"("id") ON DELETE SET NULL ON UPDATE CASCADE;
