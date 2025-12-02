"use server"

import { revalidatePage } from "@/actions/app/revalidatePage"
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
    }
  });


  revalidatePage("/purchasing/request/[referenceCode]/")

  return response;
}

