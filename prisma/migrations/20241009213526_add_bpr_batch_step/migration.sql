-- CreateTable
CREATE TABLE "bpr_batch_steps" (
    "id" TEXT NOT NULL,
    "batch_step_id" TEXT NOT NULL,
    "bpr_id" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3),
    "isComplete" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_batch_steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bpr_batch_steps" ADD CONSTRAINT "bpr_batch_steps_batch_step_id_fkey" FOREIGN KEY ("batch_step_id") REFERENCES "batch_steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_batch_steps" ADD CONSTRAINT "bpr_batch_steps_bpr_id_fkey" FOREIGN KEY ("bpr_id") REFERENCES "batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
