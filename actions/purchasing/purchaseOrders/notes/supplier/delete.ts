'use server'

import prisma from "@/lib/prisma"

export const deletePoSupplierNote = async ({ id }: { id: string }) => {
  const res = await prisma.poSupplierNote.delete({
    where: {
      id,
    },
  });

  return res;
}
