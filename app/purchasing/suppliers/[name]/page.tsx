import supplierActions from "@/actions/purchasing/supplierActions";
import supplierNoteActions from "@/actions/purchasing/supplierNoteActions";
import PageTitle from "@/components/Text/PageTitle";
import React from "react";
import SupplierInfoPanel from "./_components/supplierInfo/SupplierInfoPanel";
import supplierContactActions from "@/actions/purchasing/supplierContactActions";
import TabsMain from "./_components/tabs/TabsMain";
import StateSetter from "./_components/state/StateSetter";
import { getPurchases } from "./_actions/getPurchases";
import { getItems } from "./_actions/getItems";

type SupplierDetailsProps = {
  searchParams: {
    id: string;
  };
};

const SupplierDetails = async ({ searchParams }: SupplierDetailsProps) => {
  const supplier = await supplierActions.getOne(searchParams.id);
  const [notes, contacts, purchases, items] = await Promise.all([
    supplierNoteActions.getAll({ supplierId: supplier.id }),
    supplierContactActions.getAll(
      { supplierId: supplier.id },
      ["supplierContactNotes"],
    ),
    getPurchases(supplier.id),
    getItems(supplier.id),
  ]);

  return (
    <div className="flex flex-col gap-y-6">
      <StateSetter
        supplier={supplier}
        notes={notes}
        contacts={contacts}
        purchases={purchases}
        items={items as any[]}
      />
      <PageTitle>{supplier.name}</PageTitle>
      <TabsMain />
    </div>
  );
};

export default SupplierDetails;
