-- CreateTable
CREATE TABLE "inventory_audit_transactions" (
    "id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "inventory_audit_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_audit_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inventory_audit_transactions_transaction_id_key" ON "inventory_audit_transactions"("transaction_id");

-- AddForeignKey
ALTER TABLE "inventory_audit_transactions" ADD CONSTRAINT "inventory_audit_transactions_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_audit_transactions" ADD CONSTRAINT "inventory_audit_transactions_inventory_audit_id_fkey" FOREIGN KEY ("inventory_audit_id") REFERENCES "inventory_audits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
