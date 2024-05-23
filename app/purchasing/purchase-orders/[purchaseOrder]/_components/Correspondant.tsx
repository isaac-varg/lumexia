import Card from "@/components/Card";

import { PurchaseOrder } from "@/types/purchaseOrder";
import { TbMail, TbPhone} from "react-icons/tb";
import React from "react";

const Correspondant = ({ purchaseOrder }: { purchaseOrder: PurchaseOrder }) => {
  return (
    <div className="col-span-1 order-last">
      <Card.Root>
        <h1 className="text-xl font-poppins font-semibold">Supplier</h1>

        <span className="flex flex-row gap-x-4 items-center">
          <div className="bg-limed-spruce-400 rounded-full w-16 h-16" />

          <div>
            <h2 className="font-semibold font-inter">
              {purchaseOrder.supplier.name}
            </h2>
            <h2 className="font-medium text-slate-600">12 previous orders</h2>
          </div>
        </span>

        <hr className="border-t-1 border-t-limed-spruce-400 my-4" />

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

      </Card.Root>
    </div>
  );
};

export default Correspondant;
