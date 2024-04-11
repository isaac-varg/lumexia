/*
  Warnings:

  - You are about to drop the column `procuremment_type_id` on the `items` table. All the data in the column will be lost.
  - Added the required column `procurement_type_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_procuremment_type_id_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "procuremment_type_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "procurement_type_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Alias" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aliasTypeId" TEXT NOT NULL,
    "itemTypeId" TEXT NOT NULL,

    CONSTRAINT "Alias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alias_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "alias_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alias" ADD CONSTRAINT "Alias_aliasTypeId_fkey" FOREIGN KEY ("aliasTypeId") REFERENCES "alias_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alias" ADD CONSTRAINT "Alias_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "item_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_procurement_type_id_fkey" FOREIGN KEY ("procurement_type_id") REFERENCES "procurement_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
