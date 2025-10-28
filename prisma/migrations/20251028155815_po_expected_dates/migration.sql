-- AlterTable
ALTER TABLE "purchasing_requests" ADD COLUMN     "expected_date_end" TIMESTAMP(3),
ADD COLUMN     "expected_date_start" TIMESTAMP(3);
