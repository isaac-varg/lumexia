/*
  Warnings:

  - You are about to drop the column `created_by_id` on the `qc_record_notes` table. All the data in the column will be lost.
  - You are about to drop the column `qc_record_id` on the `qc_record_notes` table. All the data in the column will be lost.
  - Added the required column `record_id` to the `qc_record_notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `qc_record_notes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "qc_record_notes" DROP CONSTRAINT "qc_record_notes_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "qc_record_notes" DROP CONSTRAINT "qc_record_notes_qc_record_id_fkey";

-- AlterTable
ALTER TABLE "qc_record_notes" DROP COLUMN "created_by_id",
DROP COLUMN "qc_record_id",
ADD COLUMN     "record_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "qc_record_notes" ADD CONSTRAINT "qc_record_notes_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "qc_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_record_notes" ADD CONSTRAINT "qc_record_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
