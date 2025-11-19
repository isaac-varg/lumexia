/*
  Warnings:

  - A unique constraint covering the columns `[thumbnail_object_name]` on the table `files` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "thumbnail_bucket_name" TEXT,
ADD COLUMN     "thumbnail_object_name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "files_thumbnail_object_name_key" ON "files"("thumbnail_object_name");
