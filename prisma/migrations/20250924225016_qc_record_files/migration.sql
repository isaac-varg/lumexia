-- CreateTable
CREATE TABLE "qc_record_file_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviaton" TEXT,
    "description" TEXT,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_record_file_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_record_files" (
    "id" TEXT NOT NULL,
    "file_type_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "qc_record_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_record_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "qc_record_files" ADD CONSTRAINT "qc_record_files_file_type_id_fkey" FOREIGN KEY ("file_type_id") REFERENCES "qc_record_file_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_record_files" ADD CONSTRAINT "qc_record_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_record_files" ADD CONSTRAINT "qc_record_files_qc_record_id_fkey" FOREIGN KEY ("qc_record_id") REFERENCES "qc_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
