/*
  Warnings:

  - You are about to drop the column `examination_type` on the `qc_records` table. All the data in the column will be lost.
  - Added the required column `examination_type_id` to the `qc_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "qc_records" DROP COLUMN "examination_type",
ADD COLUMN     "examination_type_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "qc_examination_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "description" TEXT,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_examination_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "qc_records" ADD CONSTRAINT "qc_records_examination_type_id_fkey" FOREIGN KEY ("examination_type_id") REFERENCES "qc_examination_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
