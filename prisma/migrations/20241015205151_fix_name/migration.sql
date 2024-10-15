/*
  Warnings:

  - You are about to drop the `BprStepActionableVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BprStepActionableVerification" DROP CONSTRAINT "BprStepActionableVerification_bpr_step_actionable_id_fkey";

-- DropForeignKey
ALTER TABLE "BprStepActionableVerification" DROP CONSTRAINT "BprStepActionableVerification_completed_by_user_id_fkey";

-- DropTable
DROP TABLE "BprStepActionableVerification";

-- CreateTable
CREATE TABLE "bpr_step_actionable_verifications" (
    "id" TEXT NOT NULL,
    "completed_by_user_id" TEXT NOT NULL,
    "bpr_step_actionable_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_step_actionable_verifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bpr_step_actionable_verifications" ADD CONSTRAINT "bpr_step_actionable_verifications_completed_by_user_id_fkey" FOREIGN KEY ("completed_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_step_actionable_verifications" ADD CONSTRAINT "bpr_step_actionable_verifications_bpr_step_actionable_id_fkey" FOREIGN KEY ("bpr_step_actionable_id") REFERENCES "bpr_step_actionables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
