/*
  Warnings:

  - Added the required column `statusId` to the `bpr_batch_steps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bpr_batch_steps" ADD COLUMN     "statusId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "bpr_batch_step_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_batch_step_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bpr_batch_steps" ADD CONSTRAINT "bpr_batch_steps_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "bpr_batch_step_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
