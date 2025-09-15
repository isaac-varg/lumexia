'use server'
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma";
import { groupByProperty } from "@/utils/data/groupByProperty";
import { sortByProperty } from "@/utils/data/sortByProperty.generic";

const { failed, completed, released } = staticRecords.production.bprStatuses;

export const getPlanningBprs = async () => {
  const bprs = await prisma.batchProductionRecord.findMany({
    where: {
      NOT: {
        bprStatusId: {
          in: [failed, completed, released]
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
