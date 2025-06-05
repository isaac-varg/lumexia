'use server'

import prisma from "@/lib/prisma"
import { transform } from "next/dist/build/swc";

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
        take: 400,
    });

    const transformed = lots.map(l => {

        const hasOrigin = l.lotOrigin.length !== 0;
        const purchaseOrderNumber = hasOrigin ? l.lotOrigin[0].purchaseOrder?.referenceCode || null : null
        const batchNumber = hasOrigin ? l.lotOrigin[0].bpr?.referenceCode || null : null


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
