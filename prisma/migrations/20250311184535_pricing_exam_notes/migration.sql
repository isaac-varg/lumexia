-- CreateTable
CREATE TABLE "pricing_examination_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_examination_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_examination_notes" (
    "id" TEXT NOT NULL,
    "pricing_examination_id" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_examination_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_examinations" (
    "id" TEXT NOT NULL,
    "examined_item_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_examinations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pricing_examination_notes" ADD CONSTRAINT "pricing_examination_notes_pricing_examination_id_fkey" FOREIGN KEY ("pricing_examination_id") REFERENCES "pricing_examinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_examination_notes" ADD CONSTRAINT "pricing_examination_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_examination_notes" ADD CONSTRAINT "pricing_examination_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "pricing_examination_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_examinations" ADD CONSTRAINT "pricing_examinations_examined_item_id_fkey" FOREIGN KEY ("examined_item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_examinations" ADD CONSTRAINT "pricing_examinations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
