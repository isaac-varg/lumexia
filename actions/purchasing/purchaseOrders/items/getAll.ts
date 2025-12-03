'use server'

import { handleLot } from "@/app/receiving/[referenceCode]/_actions/receiveItems";
import prisma from "@/lib/prisma"
import { UomConversionError } from "@/utils/uom/conversionError";
import { validateConversion } from "@/utils/uom/validateConversion";

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
    const conversionValidation = await validateConversion(
      { isStandard: item.uom.isStandardUom, id: item.uom.id },
      { isStandard: item.item.inventoryUom.isStandardUom, id: item.item.inventoryUom.id },
      item.purchaseOrders.supplierId,
      item.item.id,
    )

    if (!conversionValidation.isSuccessful && conversionValidation.error instanceof UomConversionError) {
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
