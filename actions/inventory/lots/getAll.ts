'use server'

import prisma from "@/lib/prisma"

export const getAllLots = async () => {

  const lots = await prisma.lot.findMany({
    include: {
      item: true,
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
    },
    orderBy: {
      createdAt: 'desc'
    },
  });

  const transformed = lots.map(l => {

    const purchaseOrderNumber = l.lotOrigin?.purchaseOrder?.referenceCode || null;
    const batchNumber = l.lotOrigin?.bpr?.referenceCode || null;

    return ({
      ...l,
      purchaseOrderNumber,
      batchNumber,
      itemName: l.item.name,
    })

  })

  return transformed
};

export type Lot = Awaited<ReturnType<typeof getAllLots>>[number]
