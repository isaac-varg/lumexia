import React from "react";
import Tabs from "./Tabs";
import { Item } from "@/types/item";
import containerActions from "@/actions/inventory/containerActions";
import { flattenLots } from "../_functions/flattenLots";
import lotActions from "@/actions/inventory/lotActions";
import prisma from "@/lib/prisma";
import containerTypeActions from "@/actions/inventory/containerTypeActions";
import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";


const TabsPanel = async ({ item }: { item: Item }) => {

  const lots = await lotActions.getByItem(item.id);
  const containerTypes = await containerTypeActions.getAll();
  const flattenedLots =  flattenLots(lots as any);

  const purchaseOrders =  await prisma.purchaseOrder.findMany({
    where: {
      PurchaseOrderItem: {
        some: {
          itemId: item.id
        }
      }
    },
    include: {
      supplier: true,
      user: true,
      status:  true,
      paymentMethod: true
    }
  })

  return (
    <div>
      <Tabs item={item} lots={flattenedLots} containerTypes={containerTypes} purchaseOrders={purchaseOrders} />
    </div>
  );
};

export default TabsPanel;
