'use server'
import { bprStatuses } from "@/configs/staticRecords/bprStatuses";
import prisma from "@/lib/prisma";

const { failed, completed, released } = bprStatuses;

export const getPlanningBprs = async () => {
  const bprs = await prisma.batchProductionRecord.findMany({
    where: {
      NOT: {
        bprStatusId: {
          in: [failed, released]
        }
      }
    },
    include: {
      status: true,
      mbpr: {
        include: {
          producesItem: true
        }
      },
      lotOrigin: {
        include: {
          lot: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  const fixed = await Promise.all(bprs.map(async (bpr) => {
    return {
      ...bpr,
      producedItemName: bpr.mbpr.producesItem.name,
      bprStatusName: bpr.status.name,
    }
  }));


  return fixed;
}


export type PlanningBpr = Awaited<ReturnType<typeof getPlanningBprs>>[number];
