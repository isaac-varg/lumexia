/*
  Warnings:

  - You are about to drop the `Alias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Alias" DROP CONSTRAINT "Alias_aliasTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Alias" DROP CONSTRAINT "Alias_itemTypeId_fkey";

-- DropTable
DROP TABLE "Alias";

-- CreateTable
CREATE TABLE "aliases" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias_type_id" TEXT NOT NULL,
    "item_type_id" TEXT NOT NULL,

    CONSTRAINT "aliases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aliases" ADD CONSTRAINT "aliases_alias_type_id_fkey" FOREIGN KEY ("alias_type_id") REFERENCES "alias_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aliases" ADD CONSTRAINT "aliases_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "item_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
