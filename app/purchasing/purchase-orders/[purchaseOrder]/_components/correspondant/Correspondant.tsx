import Card from "@/components/Card";

import { TbMail, TbPhone } from "react-icons/tb";
import React from "react";
import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import PaymentMethodSelector from "../payment/PaymentMethodSelector";
import supplierPaymentMethodActions from "@/actions/purchasing/supplierPaymentMethods";
import PaymentMethodForm from "../payment/PaymentMethodForm";
import supplierNoteActions from "@/actions/purchasing/supplierNoteActions";
import { SupplierNote } from "@/types/SupplierNote";
import SupplierNameTag from "./SupplierNameTag";
import { PurchaseOrderDetails } from "../../_functions/getPurchaseOrder";

const Correspondant = async ({
  purchaseOrder,
}: {
  purchaseOrder: PurchaseOrderDetails;
}) => {
  const poWithPaymentMethod = purchaseOrder.paymentMethodId
    ? await purchaseOrderActions.getOne(purchaseOrder.id, undefined, [
        "paymentMethod",
      ])
    : null;

  const supplierPaymentMethods = await supplierPaymentMethodActions.getAll(
    { supplierId: purchaseOrder.supplier.id },
    ["paymentMethod"]
  );

  const supplierNotes = await supplierNoteActions.getAll({supplierId: purchaseOrder.supplierId});

  return (
    <div>
      <PaymentMethodForm
        methods={supplierPaymentMethods}
        purchaseOrderId={purchaseOrder.id}
      />
      <div className="col-span-1 order-last">
        <Card.Root>
          <h1 className="text-xl font-poppins font-semibold">Supplier</h1>

        <SupplierNameTag supplier={purchaseOrder.supplier} />

      
          <hr className="border-t border-t-limed-spruce-400 my-4" />
          <h1 className="text-xl font-poppins font-semibold">Supplier Notes</h1>
          <ul className="list-disc px-4">
            
          {supplierNotes.map( (note: SupplierNote) => {
            return <li key={note.id}>{note.content}</li>
          })}
        </ul>
        </Card.Root>
      </div>
    </div>
  );
};

export default Correspondant;
