-- CreateTable
CREATE TABLE "bpr_staging_verifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "bpr_staging_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_staging_verifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bpr_staging_verifications" ADD CONSTRAINT "bpr_staging_verifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_staging_verifications" ADD CONSTRAINT "bpr_staging_verifications_bpr_staging_id_fkey" FOREIGN KEY ("bpr_staging_id") REFERENCES "bpr_stagings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
