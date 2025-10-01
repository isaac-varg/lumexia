"use server"

import { bprStagingStatuses } from "@/configs/staticRecords/bprStagingStatuses";
import prisma from "@/lib/prisma";

export const getBprBom = async (bprId: string, isSecondary: boolean) => {

  // by isSecondary i mean it needs secondary verification, not sure if i was consisten with the nomenclature
  // todo clean up variable names

  const { staged, verified } = bprStagingStatuses;

  const statusId = isSecondary ? verified : staged

  const bom = await prisma.bprBillOfMaterials.findMany({
    where: {
      bprId,
      statusId,
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
