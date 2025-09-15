-- CreateTable
CREATE TABLE "item_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_notes" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item_notes" ADD CONSTRAINT "item_notes_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_notes" ADD CONSTRAINT "item_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_notes" ADD CONSTRAINT "item_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "item_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
