-- CreateTable
CREATE TABLE "lot_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lot_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lot_notes" (
    "id" TEXT NOT NULL,
    "lot_id" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lot_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lot_notes" ADD CONSTRAINT "lot_notes_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_notes" ADD CONSTRAINT "lot_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_notes" ADD CONSTRAINT "lot_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "lot_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
