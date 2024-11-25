-- CreateTable
CREATE TABLE "MicroSubmission" (
    "id" TEXT NOT NULL,
    "bprId" TEXT NOT NULL,
    "submission_number" SERIAL NOT NULL,

    CONSTRAINT "MicroSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MicroSubmission" ADD CONSTRAINT "MicroSubmission_bprId_fkey" FOREIGN KEY ("bprId") REFERENCES "batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
