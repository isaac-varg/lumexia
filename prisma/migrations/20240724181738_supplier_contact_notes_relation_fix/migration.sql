-- DropForeignKey
ALTER TABLE "supplier_contact_notes" DROP CONSTRAINT "supplier_contact_notes_supplier_contact_id_fkey";

-- AddForeignKey
ALTER TABLE "supplier_contact_notes" ADD CONSTRAINT "supplier_contact_notes_supplier_contact_id_fkey" FOREIGN KEY ("supplier_contact_id") REFERENCES "supplier_contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
