'use server'

import prisma from "@/lib/prisma";

export const getPricingBom = async (mbprId: string) => {
    const bom = await prisma.billOfMaterial.findMany({
        where: {
            mbprId,
        },
        include: {
            item: {
                include: {
                    itemPricingData: true,
                    purchaseOrderItem: {
                        take: 1,
                        orderBy: {
                            updatedAt: 'desc',
                        },
                    },
                },
            }
        }
    });

    return bom;
}

export type PricingBOM = Awaited<ReturnType<typeof getPricingBom>>[number]


