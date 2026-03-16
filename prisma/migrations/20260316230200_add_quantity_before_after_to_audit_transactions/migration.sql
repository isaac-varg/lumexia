-- AlterTable
ALTER TABLE "discrepancy_audit_item_transactions" ADD COLUMN     "quantity_after" DOUBLE PRECISION,
ADD COLUMN     "quantity_before" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "inventory_audit_transactions" ADD COLUMN     "quantity_after" DOUBLE PRECISION,
ADD COLUMN     "quantity_before" DOUBLE PRECISION;
