import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";
import PageTitle from "@/components/Text/PageTitle";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { DateTime } from "luxon";
import React from "react";
import { LuCalendarPlus, LuCalendarClock } from "react-icons/lu";
import ItemTable from "./_components/ItemTable";
import { flattenOrderItems } from "./_functions/flattenOrderItems";

type PurchaseOrderDetailsProps = {
  params: {
    purchaseOrder: string;
  };
  searchParams: {
    id: string;
  };
};

const PurchaseOrderDetails = async ({
  params,
  searchParams,
}: PurchaseOrderDetailsProps) => {
  const purchaseOrder: PurchaseOrder = await purchaseOrderActions.getOne(
    searchParams.id
  );

  const items = await purchaseOrderItemActions.getAll({
    purchaseOrderId: purchaseOrder.id,
  }, ["item", "uom", "purchaseOrderStatus"]);

  
  return (
    <div>
      <PageTitle title={`PO #${purchaseOrder.referenceCode}`} />
      <span className="flex flex-row gap-x-2 items-center text-sm text-neutral-500 font-poppins">
        <LuCalendarPlus />
        <p>{DateTime.fromJSDate(purchaseOrder.createdAt).toFormat("DD @ t")}</p>
      </span>

      <ItemTable items={flattenOrderItems(items)}/>
    </div>
  );
};

export default PurchaseOrderDetails;
