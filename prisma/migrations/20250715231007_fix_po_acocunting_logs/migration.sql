/*
  Warnings:

  - You are about to drop the `po_acocunting_audit_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "po_acocunting_audit_logs" DROP CONSTRAINT "po_acocunting_audit_logs_user_id_fkey";

-- DropTable
DROP TABLE "po_acocunting_audit_logs";

-- CreateTable
CREATE TABLE "po_accounting_audit_logs" (
    "id" TEXT NOT NULL,
    "po_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "po_accounting_audit_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "po_accounting_audit_logs" ADD CONSTRAINT "po_accounting_audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_accounting_audit_logs" ADD CONSTRAINT "po_accounting_audit_logs_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
