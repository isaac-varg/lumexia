/*
  Warnings:

  - You are about to drop the column `approved` on the `pricing_examinations` table. All the data in the column will be lost.
  - You are about to drop the column `rejected` on the `pricing_examinations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pricing_examinations" DROP COLUMN "approved",
DROP COLUMN "rejected",
ADD COLUMN     "status_id" TEXT;

-- CreateTable
CREATE TABLE "pricing_examination_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sequence" INTEGER NOT NULL,
    "bg_color" TEXT NOT NULL DEFAULT '#333333',
    "text_color" TEXT NOT NULL DEFAULT '#ffffff',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_examination_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pricing_examination_statuses_sequence_key" ON "pricing_examination_statuses"("sequence");

-- AddForeignKey
ALTER TABLE "pricing_examinations" ADD CONSTRAINT "pricing_examinations_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "pricing_examination_statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
