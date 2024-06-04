import Card from "@/components/Card";

import { PurchaseOrder } from "@/types/purchaseOrder";
import { TbMail, TbPhone } from "react-icons/tb";
import React from "react";
import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import PaymentMethodSelector from "./PaymentMethodSelector";
import supplierPaymentMethodActions from "@/actions/purchasing/supplierPaymentMethods";
import PaymentMethodForm from "./PaymentMethodForm";
import supplierNoteActions from "@/actions/purchasing/supplierNoteActions";
import { SupplierNote } from "@/types/SupplierNote";
import SupplierNameTag from "./SupplierNameTag";

const Correspondant = async ({
  purchaseOrder,
}: {
  purchaseOrder: PurchaseOrder;
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
    <>
      <PaymentMethodForm
        methods={supplierPaymentMethods}
        purchaseOrderId={purchaseOrder.id}
      />
      <div className="col-span-1 order-last">
        <Card.Root>
          <h1 className="text-xl font-poppins font-semibold">Supplier</h1>

        <SupplierNameTag supplier={purchaseOrder.supplier} />


          <div>
            <span className="flex flex-row gap-x-4 text-lg font-inter items-center">
              <TbMail />
              <p>test@gmail.com</p>
            </span>
            <span className="flex flex-row gap-x-4 text-lg font-inter items-center">
              <TbPhone />
              <p>{purchaseOrder.supplier.phone}</p>
            </span>
          </div>

          <hr className="border-t-1 border-t-limed-spruce-400 my-4" />
          <h1 className="text-xl font-poppins font-semibold">Payment Method</h1>

          <PaymentMethodSelector
            method={poWithPaymentMethod}
            supplierPaymentMethods={supplierPaymentMethods}
          />

          <hr className="border-t-1 border-t-limed-spruce-400 my-4" />
          <h1 className="text-xl font-poppins font-semibold">Supplier Notes</h1>
          <ul className="list-disc px-4">
            
          {supplierNotes.map( (note: SupplierNote) => {
            return <li key={note.id}>{note.content}</li>
          })}
        </ul>
        </Card.Root>
      </div>
    </>
  );
};

export default Correspondant;
