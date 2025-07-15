-- AlterTable
ALTER TABLE "payment_methods" ALTER COLUMN "expiry" DROP NOT NULL,
ALTER COLUMN "expiry" SET DATA TYPE TEXT;
