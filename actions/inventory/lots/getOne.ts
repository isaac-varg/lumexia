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

    return lot
};


export type SingleLot = Awaited<ReturnType<typeof getSingleLot>>


