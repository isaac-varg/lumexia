'use server'

import prisma from "@/lib/prisma"
import { PurchasableItem } from "./getAllItems"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { uom } from "@/configs/staticRecords/unitsOfMeasurement";

export const handleItemAdd = async (purchaseOrderId: string, item: PurchasableItem, poStatusId: string) => {

  //  const previousPurchase = await prisma.purchaseOrderItem.findFirst({
  //    where: {
  //      itemId: item.id,
  //    },
  //    orderBy: {
  //      createdAt: 'desc'
  //    },
  //  });
  //
  //
  await createActivityLog('Add Order Item', 'purchaseOrder', purchaseOrderId, { context: `${item.name} was added` })

  return await prisma.purchaseOrderItem.create({
    data: {
      itemId: item.id,
      purchaseOrderId,
      quantity: 0,
      uomId: uom.pounds,
      pricePerUnit: 0,
      // quantity: previousPurchase ? previousPurchase.quantity : 0,
      // uomId: previousPurchase ? previousPurchase.uomId : uom.pounds,
      // pricePerUnit: previousPurchase ? previousPurchase.pricePerUnit : 0,
      purchaseOrderStatusId: poStatusId,
    }
  });


}
