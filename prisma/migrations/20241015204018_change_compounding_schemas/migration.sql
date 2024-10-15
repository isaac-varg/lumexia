/*
  Warnings:

  - You are about to drop the column `completed_at` on the `bpr_step_action_completions` table. All the data in the column will be lost.
  - You are about to drop the column `isComplete` on the `bpr_step_actionables` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `bpr_step_action_completions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCompounded` to the `bpr_step_actionables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSecondarilyVerified` to the `bpr_step_actionables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerified` to the `bpr_step_actionables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondary_verification_required` to the `bpr_step_actionables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verification_required` to the `bpr_step_actionables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bpr_step_action_completions" DROP COLUMN "completed_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "bpr_step_actionables" DROP COLUMN "isComplete",
ADD COLUMN     "isCompounded" BOOLEAN NOT NULL,
ADD COLUMN     "isSecondarilyVerified" BOOLEAN NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL,
ADD COLUMN     "secondary_verification_required" BOOLEAN NOT NULL,
ADD COLUMN     "verification_required" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "BprStepActionableVerification" (
    "id" TEXT NOT NULL,
    "completed_by_user_id" TEXT NOT NULL,
    "bpr_step_actionable_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BprStepActionableVerification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BprStepActionableVerification" ADD CONSTRAINT "BprStepActionableVerification_completed_by_user_id_fkey" FOREIGN KEY ("completed_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BprStepActionableVerification" ADD CONSTRAINT "BprStepActionableVerification_bpr_step_actionable_id_fkey" FOREIGN KEY ("bpr_step_actionable_id") REFERENCES "bpr_step_actionables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
