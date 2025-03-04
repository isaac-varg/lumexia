/*
  Warnings:

  - You are about to drop the column `name` on the `consumer_containers` table. All the data in the column will be lost.
  - Added the required column `container_item_id` to the `consumer_containers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulties_cost` to the `item_consumer_containers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consumer_containers" DROP COLUMN "name",
ADD COLUMN     "container_item_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "item_consumer_containers" ADD COLUMN     "difficulties_cost" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "consumer_containers" ADD CONSTRAINT "consumer_containers_container_item_id_fkey" FOREIGN KEY ("container_item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
