/*
  Warnings:

  - You are about to drop the column `user_role_id` on the `step_actionables` table. All the data in the column will be lost.
  - Added the required column `user_role_id` to the `step_actionable_types` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "step_actionables" DROP CONSTRAINT "step_actionables_user_role_id_fkey";

-- AlterTable
ALTER TABLE "step_actionable_types" ADD COLUMN     "user_role_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "step_actionables" DROP COLUMN "user_role_id";

-- AddForeignKey
ALTER TABLE "step_actionable_types" ADD CONSTRAINT "step_actionable_types_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
