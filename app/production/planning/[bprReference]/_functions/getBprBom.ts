"use server"

import prisma from "@/lib/prisma";

export const getBprBom = async (bprId: string ) => {

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



  return bom;
}
