"use server"
import prisma from "@/lib/prisma"

export const getBom = async (bprId?: string) => {
  if (!bprId) return;

  const bom = await prisma.bprBillOfMaterials.findMany({
    where: {
      bprId,
    },
    include: {
      bom: {
        include: {
          item: true
        }
      },
      status: true,
      bpr: true
    }
  })

  return bom
}
