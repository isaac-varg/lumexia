-- CreateTable
CREATE TABLE "general_request_files" (
    "id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "general_request_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "general_request_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_request_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "general_request_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_request_notes" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "general_request_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_request_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL DEFAULT '#c4b5fd',
    "text_color" TEXT NOT NULL DEFAULT '#FFFFFF',
    "description" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "general_request_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_requests" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "general_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "general_request_files" ADD CONSTRAINT "general_request_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_request_files" ADD CONSTRAINT "general_request_files_general_request_id_fkey" FOREIGN KEY ("general_request_id") REFERENCES "general_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_request_notes" ADD CONSTRAINT "general_request_notes_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "general_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_request_notes" ADD CONSTRAINT "general_request_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_request_notes" ADD CONSTRAINT "general_request_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "general_request_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_requests" ADD CONSTRAINT "general_requests_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "general_request_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_requests" ADD CONSTRAINT "general_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
