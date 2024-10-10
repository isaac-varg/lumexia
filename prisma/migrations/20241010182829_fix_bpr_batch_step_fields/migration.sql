/*
  Warnings:

  - You are about to drop the column `bpr_step_actionable_id` on the `bpr_step_actionables` table. All the data in the column will be lost.
  - Added the required column `batch_step_actionable_id` to the `bpr_step_actionables` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bpr_step_actionables" DROP CONSTRAINT "bpr_step_actionables_bpr_step_actionable_id_fkey";

-- AlterTable
ALTER TABLE "bpr_step_actionables" DROP COLUMN "bpr_step_actionable_id",
ADD COLUMN     "batch_step_actionable_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bpr_step_actionables" ADD CONSTRAINT "bpr_step_actionables_batch_step_actionable_id_fkey" FOREIGN KEY ("batch_step_actionable_id") REFERENCES "step_actionables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
