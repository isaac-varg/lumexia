"use server"

import { revalidatePage } from "@/actions/app/revalidatePage"
import { staticRecords } from "@/configs/staticRecords"
import { containerTypes } from "@/configs/staticRecords/containerTypes"
import { uom } from "@/configs/staticRecords/unitsOfMeasurement"
import prisma from "@/lib/prisma"

export const createLinkedPo = async (data: {
  requestId: string,
  poId: string,
}, poItemId: string) => {

  const response = await prisma.requestPurchaseOrder.create({
    data,
  })


  const itemDetails = await prisma.purchaseOrderItemDetail.create({
    data: {
      poItemId,
      quantityOfContainers: 0,
      weightUomId: uom.pounds,
      containerTypeId: containerTypes.drum,
      weightPerContainer: 0,
    }
  });


  revalidatePage("/purchasing/request/[referenceCode]/")

  return response;
}

