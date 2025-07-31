import Card from "@/components/Card";

import React from "react";
import { SupplierNote } from "@/types/SupplierNote";
import SupplierNameTag from "./SupplierNameTag";
import { PurchaseOrderDetails } from "../../_functions/getPurchaseOrder";

const Correspondant = ({
    purchaseOrder,
    supplierNotes,

}: {
    purchaseOrder: PurchaseOrderDetails;
    supplierNotes: any
}) => {

    return (
        <div>
            <div className="col-span-1 order-last">
                <Card.Root>
                    <h1 className="text-xl font-poppins font-semibold">Supplier</h1>

                    <SupplierNameTag supplier={purchaseOrder.supplier} />


                    <hr className="border-t-1 border-t-limed-spruce-400 my-4" />
                    <h1 className="text-xl font-poppins font-semibold">Supplier Notes</h1>
                    <ul className="list-disc px-4">

                        {supplierNotes.map((note: SupplierNote) => {
                            return <li key={note.id}>{note.content}</li>
                        })}
                    </ul>
                </Card.Root>
            </div>
        </div>
    );
};

export default Correspondant;
