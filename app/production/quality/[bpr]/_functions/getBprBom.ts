"use server"

import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma";

export const getBprBom = async (bprId: string) => {


const bom = await prisma.bprBillOfMaterials.findMany({
    where: {
      bprId,
      statusId: staticRecords.production.bprBomStatuses.staged,
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
