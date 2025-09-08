-- CreateTable
CREATE TABLE "bpr_staging_files" (
    "id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "bpr_staging_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_staging_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bpr_staging_files" ADD CONSTRAINT "bpr_staging_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_staging_files" ADD CONSTRAINT "bpr_staging_files_bpr_staging_id_fkey" FOREIGN KEY ("bpr_staging_id") REFERENCES "bpr_stagings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
