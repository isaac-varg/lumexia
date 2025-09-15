'use server'

import prisma from "@/lib/prisma"


// TODO maybe filter out some by date so the list isn't sooo long'

export interface IBprForSSF {
  bprId: string
  bprReferenceCode: number
  producedItemName: string
  producedItemIID: string
  lotNumber: string
}

export const getBprs = async () => {
  const bprs = await prisma.batchProductionRecord.findMany({
    include: {
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
      referenceCode: 'desc'

    }
  })

  const ssfBprs: IBprForSSF[] = bprs.map((bpr) => {
    return {
      bprId: bpr.id,
      bprReferenceCode: bpr.referenceCode,
      producedItemName: bpr.mbpr.producesItem.name,
      producedItemIID: bpr.mbpr.producesItem.referenceCode,
      lotNumber: bpr.lotOrigin ? bpr.lotOrigin.lot.lotNumber : '',
    }
  })

  return ssfBprs
}
