/*
  Warnings:

  - You are about to drop the `MicroSubmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MicroSubmission" DROP CONSTRAINT "MicroSubmission_bprId_fkey";

-- DropTable
DROP TABLE "MicroSubmission";

-- CreateTable
CREATE TABLE "configs" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "data_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "micro_submissions" (
    "id" TEXT NOT NULL,
    "bpr_id" TEXT NOT NULL,
    "submission_number" SERIAL NOT NULL,

    CONSTRAINT "micro_submissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "micro_submissions" ADD CONSTRAINT "micro_submissions_bpr_id_fkey" FOREIGN KEY ("bpr_id") REFERENCES "batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
