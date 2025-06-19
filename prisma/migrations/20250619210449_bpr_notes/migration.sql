-- CreateTable
CREATE TABLE "bpr_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bpr_notes" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bpr_notes" ADD CONSTRAINT "bpr_notes_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_notes" ADD CONSTRAINT "bpr_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_notes" ADD CONSTRAINT "bpr_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "bpr_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
