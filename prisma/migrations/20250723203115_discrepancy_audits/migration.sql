-- CreateTable
CREATE TABLE "discrepancy_audit_item_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discrepancy_audit_item_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discrepancy_audit_item_notes" (
    "id" TEXT NOT NULL,
    "audit_item_id" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discrepancy_audit_item_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discrepancy_audit_item_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sequence" INTEGER NOT NULL,
    "bg_color" TEXT NOT NULL DEFAULT '#333333',
    "text_color" TEXT NOT NULL DEFAULT '#ffffff',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discrepancy_audit_item_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discrepancy_audit_item_transactions" (
    "id" TEXT NOT NULL,
    "audit_item_id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discrepancy_audit_item_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discrepancy_audit_items" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "status_id" TEXT NOT NULL,
    "discrepancy_audit_id" TEXT NOT NULL,
    "starting_total_quantity" DOUBLE PRECISION NOT NULL,
    "ending_total_quantity" DOUBLE PRECISION,
    "quantities_uom_id" TEXT NOT NULL,
    "starting_lots_count" INTEGER NOT NULL,
    "ending_lots_count" INTEGER,
    "starting_depleted_lots_count" INTEGER NOT NULL,
    "ending_depleted_lots_count" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discrepancy_audit_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discrepancy_audit_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sequence" INTEGER NOT NULL,
    "bg_color" TEXT NOT NULL DEFAULT '#333333',
    "text_color" TEXT NOT NULL DEFAULT '#ffffff',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discrepancy_audit_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discrepancy_audits" (
    "id" TEXT NOT NULL,
    "completed_on" TEXT,
    "item_type_id" TEXT,
    "status_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discrepancy_audits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discrepancy_audit_item_statuses_sequence_key" ON "discrepancy_audit_item_statuses"("sequence");

-- CreateIndex
CREATE UNIQUE INDEX "discrepancy_audit_item_transactions_transaction_id_key" ON "discrepancy_audit_item_transactions"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "discrepancy_audit_statuses_sequence_key" ON "discrepancy_audit_statuses"("sequence");

-- AddForeignKey
ALTER TABLE "discrepancy_audit_item_notes" ADD CONSTRAINT "discrepancy_audit_item_notes_audit_item_id_fkey" FOREIGN KEY ("audit_item_id") REFERENCES "discrepancy_audit_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audit_item_notes" ADD CONSTRAINT "discrepancy_audit_item_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audit_item_notes" ADD CONSTRAINT "discrepancy_audit_item_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "discrepancy_audit_item_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audit_item_transactions" ADD CONSTRAINT "discrepancy_audit_item_transactions_audit_item_id_fkey" FOREIGN KEY ("audit_item_id") REFERENCES "discrepancy_audit_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audit_item_transactions" ADD CONSTRAINT "discrepancy_audit_item_transactions_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audit_items" ADD CONSTRAINT "discrepancy_audit_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audit_items" ADD CONSTRAINT "discrepancy_audit_items_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "discrepancy_audit_item_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audit_items" ADD CONSTRAINT "discrepancy_audit_items_discrepancy_audit_id_fkey" FOREIGN KEY ("discrepancy_audit_id") REFERENCES "discrepancy_audits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audit_items" ADD CONSTRAINT "discrepancy_audit_items_quantities_uom_id_fkey" FOREIGN KEY ("quantities_uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audits" ADD CONSTRAINT "discrepancy_audits_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "item_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discrepancy_audits" ADD CONSTRAINT "discrepancy_audits_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "discrepancy_audit_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
