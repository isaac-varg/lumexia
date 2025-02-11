/*
  Warnings:

  - You are about to drop the `audit_responses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status_id` to the `audit_requests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "audit_responses" DROP CONSTRAINT "audit_responses_inventory_audit_id_fkey";

-- DropForeignKey
ALTER TABLE "audit_responses" DROP CONSTRAINT "audit_responses_request_id_fkey";

-- AlterTable
ALTER TABLE "audit_requests" ADD COLUMN     "inventory_audit_id" TEXT,
ADD COLUMN     "status_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "audit_responses";

-- CreateTable
CREATE TABLE "audit_request_note_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audit_request_note_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_request_notes" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "note_type_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audit_request_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_request_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sequence" INTEGER NOT NULL,
    "bg_color" TEXT NOT NULL DEFAULT '#333333',
    "text_color" TEXT NOT NULL DEFAULT '#ffffff',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audit_request_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "audit_request_statuses_sequence_key" ON "audit_request_statuses"("sequence");

-- AddForeignKey
ALTER TABLE "audit_request_notes" ADD CONSTRAINT "audit_request_notes_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "audit_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_request_notes" ADD CONSTRAINT "audit_request_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_request_notes" ADD CONSTRAINT "audit_request_notes_note_type_id_fkey" FOREIGN KEY ("note_type_id") REFERENCES "audit_request_note_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_requests" ADD CONSTRAINT "audit_requests_inventory_audit_id_fkey" FOREIGN KEY ("inventory_audit_id") REFERENCES "inventory_audits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_requests" ADD CONSTRAINT "audit_requests_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "audit_request_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
