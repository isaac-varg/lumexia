'use server'

import { getAuxiliariesTotalCost } from "@/app/accounting/pricing/_calculations/getAuxiliariesTotalCost";
import prisma from "@/lib/prisma"

export const getFinishedProductsByItem = async (itemId: string) => {
    const fp = await prisma.finishedProduct.findMany({
        where: {
            filledWithItemId: itemId,
        },
        include: {
            fillUom: true,
            auxiliaries: {
                include: {
                    auxiliaryItem: {
                        include: {
                            itemPricingData: {
                                include: {
                                    upcomingPriceUom: true,
                                },
                            },
                            aliases: true,
                            itemType: true,
                        },
                    },
                },
            },
        },
    });

    const withAuxiliaries = await Promise.all(
        fp.map(async (current) => {
            const auxiliaries = await getAuxiliariesTotalCost(current.auxiliaries);
            return {
                ...current,
                auxiliaries,
            };
        })
    );

    return withAuxiliaries;
};

export type FinishedProduct = Awaited<ReturnType<typeof getFinishedProductsByItem>>[number]

