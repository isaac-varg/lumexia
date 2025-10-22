'use server'

import prisma from "@/lib/prisma"

export const deleteSupplierTag = async (tagId: string) => {
  return await prisma.purchasingRequestSupplierTag.delete({
    where: {
      id: tagId,
    }
  });
}
