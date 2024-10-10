-- CreateTable
CREATE TABLE "bpr_step_actionables" (
    "id" TEXT NOT NULL,
    "bpr_batch_step_id" TEXT NOT NULL,
    "bpr_step_actionable_id" TEXT NOT NULL,
    "iscomplete" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "bpr_step_actionables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bpr_step_action_completions" (
    "id" TEXT NOT NULL,
    "completed_by_user_id" TEXT NOT NULL,
    "bpr_step_actionable_id" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "bpr_step_action_completions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bpr_step_actionables" ADD CONSTRAINT "bpr_step_actionables_bpr_batch_step_id_fkey" FOREIGN KEY ("bpr_batch_step_id") REFERENCES "bpr_batch_steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_step_actionables" ADD CONSTRAINT "bpr_step_actionables_bpr_step_actionable_id_fkey" FOREIGN KEY ("bpr_step_actionable_id") REFERENCES "step_actionables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_step_actionables" ADD CONSTRAINT "bpr_step_actionables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_step_action_completions" ADD CONSTRAINT "bpr_step_action_completions_completed_by_user_id_fkey" FOREIGN KEY ("completed_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_step_action_completions" ADD CONSTRAINT "bpr_step_action_completions_bpr_step_actionable_id_fkey" FOREIGN KEY ("bpr_step_actionable_id") REFERENCES "bpr_step_actionables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
