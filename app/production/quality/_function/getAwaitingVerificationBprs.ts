"use server"

import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma";

export const getAwaitingVerificationBprs = async () => {

  const bprs = await prisma.batchProductionRecord.findMany({
    where: {
      BprBillOfMaterials: {
        some: {
          statusId: staticRecords.production.bprBomStatuses.staged
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
