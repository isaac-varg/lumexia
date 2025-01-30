/*
  Warnings:

  - Added the required column `note_type_id` to the `request_notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "request_notes" ADD COLUMN     "note_type_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "request_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_note_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "request_notes" ADD CONSTRAINT "request_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "request_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
