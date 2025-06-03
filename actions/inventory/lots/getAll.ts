'use server'

import prisma from "@/lib/prisma"

export const getAllLots = async () => {

    const lots = await prisma.lot.findMany({
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
        }
    })

    return lots
};


