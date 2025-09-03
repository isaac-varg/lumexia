'use server'

import prisma from "@/lib/prisma"

export const getSingleLot = async (id: string) => {

  const lot = await prisma.lot.findUnique({
    where: {
      id,
    },
    include: {
      lotOrigin: {
        include: {
          bpr: {
            include: {
              mbpr: true
            }
          },
          purchaseOrder: {
            include: {
              supplier: true
            }
          },

        }
      },
      item: true
    }
  })

  if (!lot) {
    return lot
  }



  const hasOrigin = lot.lotOrigin;
  const purchaseOrderNumber = hasOrigin ? lot.lotOrigin?.purchaseOrder?.referenceCode || null : null
  const batchNumber = hasOrigin ? lot.lotOrigin?.bpr?.referenceCode || null : null

  return ({
    ...lot,
    purchaseOrderNumber,
    batchNumber,
    itemName: lot.item.name,
  })


};


export type SingleLot = Awaited<ReturnType<typeof getSingleLot>>


