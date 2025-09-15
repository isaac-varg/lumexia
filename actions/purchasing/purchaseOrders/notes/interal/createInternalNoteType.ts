'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createPoInternalNoteType = async (data: Prisma.PurchaseOrderNoteTypeUncheckedCreateInput) => {
  const res = await prisma.purchaseOrderNoteType.create({ data });
  return res;
}
