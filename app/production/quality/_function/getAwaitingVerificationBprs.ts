"use server"

import { staticRecords } from "@/configs/staticRecords";
import { bprStagingStatuses } from "@/configs/staticRecords/bprStagingStatuses";
import prisma from "@/lib/prisma";

export const getAwaitingVerificationBprs = async (isSecondary: boolean = false) => {
  const { staged, verified } = bprStagingStatuses

  const statusId = isSecondary ? verified : staged


  const bprs = await prisma.batchProductionRecord.findMany({
    where: {
      BprBillOfMaterials: {
        some: {
          statusId,
        }
      }
    },
    include: {
      status: true,
      batchSize: true,
      mbpr: {
        include: {
          producesItem: true,
        }
      }

    }
  })

  return bprs;

}
