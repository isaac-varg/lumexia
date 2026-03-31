-- CreateTable
CREATE TABLE "mbpr_note_files" (
    "id" TEXT NOT NULL,
    "mbpr_note_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mbpr_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mbpr_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mbpr_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mbpr_notes" (
    "id" TEXT NOT NULL,
    "mbpr_id" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mbpr_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mbpr_note_files" ADD CONSTRAINT "mbpr_note_files_mbpr_note_id_fkey" FOREIGN KEY ("mbpr_note_id") REFERENCES "mbpr_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mbpr_note_files" ADD CONSTRAINT "mbpr_note_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mbpr_notes" ADD CONSTRAINT "mbpr_notes_mbpr_id_fkey" FOREIGN KEY ("mbpr_id") REFERENCES "master_batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mbpr_notes" ADD CONSTRAINT "mbpr_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mbpr_notes" ADD CONSTRAINT "mbpr_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "mbpr_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
