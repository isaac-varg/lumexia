'use server'

import { PurchaseOrderItem } from "@/actions/purchasing/purchaseOrders/items/getAll"
import prisma from "@/lib/prisma"
import { generateLotNumber } from "@/utils/lot/generateLotNumber"
import { uomUtils } from "@/utils/uom"

export const ReceiveItems = async (items: PurchaseOrderItem[], partialAmounts?: Map<string, number>) => {


  // generate lot;
  // convert units
  // create lot 
  // create lot origin
  // update po item
  // create po item if partial
  // update connected requests
  // add to pricing queue

  const responses = await Promise.all(items.map(async (item) => {

  }))
}

const handleLot = async (item: PurchaseOrderItem) => {

  const lotNumber = generateLotNumber(item.item.referenceCode);
  const isUomMatching = uomUtils.isUomMatching(item.uomId, item.item.inventoryUomId);

  const lot = await prisma.lot.create({
    data: {

    }
  })
}







