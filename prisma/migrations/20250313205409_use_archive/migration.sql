/*
  Warnings:

  - You are about to drop the column `consumer_container_id` on the `item_consumer_container_archives` table. All the data in the column will be lost.
  - Added the required column `consumer_container_archive_id` to the `item_consumer_container_archives` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item_consumer_container_archives" DROP CONSTRAINT "item_consumer_container_archives_consumer_container_id_fkey";

-- AlterTable
ALTER TABLE "item_consumer_container_archives" DROP COLUMN "consumer_container_id",
ADD COLUMN     "consumer_container_archive_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "item_consumer_container_archives" ADD CONSTRAINT "item_consumer_container_archives_consumer_container_archiv_fkey" FOREIGN KEY ("consumer_container_archive_id") REFERENCES "consumer_containers_archives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
