import supplierActions from "@/actions/purchasing/supplierActions";
import supplierNoteActions from "@/actions/purchasing/supplierNoteActions";
import PageTitle from "@/components/Text/PageTitle";
import React from "react";
import SupplierInfoPanel from "./_components/supplierInfo/SupplierInfoPanel";
import supplierContactActions from "@/actions/purchasing/supplierContactActions";
import ContactsPanel from "./_components/contacts/ContactsPanel";
import CardTitle from "./_components/supplierInfo/CardTitle";

type SupplierDetailsProps = {
  searchParams: {
    id: string;
  };
};

const SupplierDetails = async ({ searchParams }: SupplierDetailsProps) => {
  const supplier = await supplierActions.getOne(searchParams.id);
  const notes = await supplierNoteActions.getAll({ supplierId: supplier.id });
  const contacts = await supplierContactActions.getAll(
    { supplierId: supplier.id },
    ["supplierContactNotes"],
  );

  return (
    <div className="flex flex-col gap-y-6">
	<PageTitle>{supplier.name}</PageTitle>
      <div className="grid grid-cols-2 gap-x-6">
        <SupplierInfoPanel supplier={supplier} notes={notes} />
        <ContactsPanel contacts={contacts} supplierId={supplier.id} />
      </div>
    </div>
  );
};

export default SupplierDetails;

//	<div className="flex flex-col gap-y-4">
//				<NotesTable data={notes} supplier={supplier} />
//
//				<PaymentMethodsPanel supplierId={supplier.id} />
//			</div>
