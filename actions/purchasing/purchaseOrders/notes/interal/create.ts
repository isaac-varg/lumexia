'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createInternalNote = async (data: Prisma.PurchaseOrderNoteUncheckedCreateInput) => {
  const res = await prisma.purchaseOrderNote.create({
    data,
  });

  return res;
}
