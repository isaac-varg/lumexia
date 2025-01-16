/*
  Warnings:

  - Added the required column `requesting_user_id` to the `purchasing_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchasing_requests" ADD COLUMN     "requesting_user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "purchasing_requests" ADD CONSTRAINT "purchasing_requests_requesting_user_id_fkey" FOREIGN KEY ("requesting_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
