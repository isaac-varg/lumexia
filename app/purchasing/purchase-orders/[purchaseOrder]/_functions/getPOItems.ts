"use server"

import { aliasTypes } from "@/configs/staticRecords/aliasTypes";
import prisma from "@/lib/prisma"

export const getPOItems = async (purchaseOrderId: string) => {

  // get the items
  const items = await prisma.purchaseOrderItem.findMany({
    where: {
      purchaseOrderId,
    },
    include: {
      item: {
        include: {
          aliases: true
        }
      },
      uom: true,
      purchaseOrderStatus: true,
      purchaseOrders: true
    }
  });


  // determine if matching aliases exists

  const aliases = await Promise.all(items.map(async (item) => {

    const matchingSupplierAlias = await prisma.supplierAlias.findFirst({
      where: {
        supplierId: item.purchaseOrders.supplierId,
        alias: {
          itemId: item.itemId,
        }
      },
      include: {
        alias: true,
      },
    })

    const otherAliases = item.item.aliases.filter(a => a.aliasTypeId !== aliasTypes.supplier);
    const aliases = [
      ...otherAliases,
      ...(matchingSupplierAlias?.alias ? [matchingSupplierAlias.alias] : [])
    ];

    // terrible naming, but 
    // alias is for the matcing supplier aliase (only one)
    // and allAliases is for the matching and other common/inci
    return {
      ...item,
      alias: matchingSupplierAlias,
      allAliases: aliases,
    }
  }));



  return aliases

}


type POItems = Awaited<ReturnType<typeof getPOItems>>

export type POItem = POItems[number];

