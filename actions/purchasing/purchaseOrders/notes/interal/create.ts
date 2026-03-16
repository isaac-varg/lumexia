'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createInternalNote = async (data: Prisma.PurchaseOrderNoteUncheckedCreateInput, fileIds: string[] = []) => {
  const res = await prisma.purchaseOrderNote.create({
    data,
  });
  await createNoteFiles('purchaseOrderNoteFile', res.id, fileIds)
  return res;
}
