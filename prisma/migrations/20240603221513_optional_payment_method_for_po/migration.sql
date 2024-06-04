-- AlterTable
ALTER TABLE "purchase_orders" ALTER COLUMN "payment_method_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
