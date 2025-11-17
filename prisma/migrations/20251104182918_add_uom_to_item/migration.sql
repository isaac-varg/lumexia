-- AlterTable
ALTER TABLE "items" ADD COLUMN     "inventory_uom_id" TEXT NOT NULL DEFAULT '68171f7f-3ac0-4a3a-b197-18742ebf6b5b';

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_inventory_uom_id_fkey" FOREIGN KEY ("inventory_uom_id") REFERENCES "units_of_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
