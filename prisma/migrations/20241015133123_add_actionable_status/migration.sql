/*
  Warnings:

  - Added the required column `status_id` to the `bpr_step_actionables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bpr_step_actionables" ADD COLUMN     "status_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "bpr_step_actionable_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_step_actionable_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bpr_step_actionables" ADD CONSTRAINT "bpr_step_actionables_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "bpr_step_actionable_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
