/*
  Warnings:

  - You are about to drop the column `item_type_id` on the `aliases` table. All the data in the column will be lost.
  - Added the required column `item_id` to the `aliases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "aliases" DROP CONSTRAINT "aliases_item_type_id_fkey";

-- AlterTable
ALTER TABLE "aliases" DROP COLUMN "item_type_id",
ADD COLUMN     "item_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "aliases" ADD CONSTRAINT "aliases_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
