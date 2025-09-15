-- CreateTable
CREATE TABLE "item_file_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviaton" TEXT,
    "description" TEXT,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_file_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_files" (
    "id" TEXT NOT NULL,
    "file_type_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item_files" ADD CONSTRAINT "item_files_file_type_id_fkey" FOREIGN KEY ("file_type_id") REFERENCES "item_file_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_files" ADD CONSTRAINT "item_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_files" ADD CONSTRAINT "item_files_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
