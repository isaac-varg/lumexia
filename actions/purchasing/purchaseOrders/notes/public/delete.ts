'use server'

import prisma from "@/lib/prisma"

export const deletePoPublicNote = async ({ id }: { id: string }) => {
  const res = await prisma.poPublicNote.delete({
    where: {
      id,
    },
  });

  return res;
}
