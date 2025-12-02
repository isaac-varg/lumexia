'use server'

import { handleLot } from "@/app/receiving/[referenceCode]/_actions/receiveItems";
import prisma from "@/lib/prisma"
import { UomConversionError } from "@/utils/uom/conversionError";

export const getAllPurchaseOrderItems = async (purchaseOrderId: string) => {


  const items = await prisma.purchaseOrderItem.findMany({
    where: {
      purchaseOrderId,
    },
    include: {
      item: {
        include: {
          itemType: {
            include: {
              config: true
            }
          },
          inventoryUom: true
        },
      },
      uom: true,
      purchaseOrders: true,
      purchaseOrderStatus: true,
      lot: {
        include: {
          item: true
        }
      },
    }
  });


  const withConversionErrors = await Promise.all(items.map(async (item) => {
    const response = await handleLot(item as PurchaseOrderItem, 1);

    if (response instanceof UomConversionError) {
      return {
        hasConversionError: true,
        ...item
      }
    }

    return {
      hasConversionError: false,
      ...item
    };
  }))



  return withConversionErrors;

}

export type PurchaseOrderItem = Awaited<ReturnType<typeof getAllPurchaseOrderItems>>[number];
