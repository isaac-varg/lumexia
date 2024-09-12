/*
  Warnings:

  - Added the required column `status_id` to the `bpr_bills_of_materials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bpr_bills_of_materials" ADD COLUMN     "status_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "bpr_staging_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_staging_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bpr_bills_of_materials" ADD CONSTRAINT "bpr_bills_of_materials_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "bpr_staging_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
