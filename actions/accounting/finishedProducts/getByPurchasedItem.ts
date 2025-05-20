'use server'

import { getAuxiliariesTotalCost } from "@/app/accounting/pricing/_calculations/getAuxiliariesTotalCost";
import { getItemCost } from "@/app/accounting/pricing/_calculations/getItemCost";
import prisma from "@/lib/prisma"
import { ItemPricingData } from "../pricing/getItemPricingData";
import { LastItemPrice } from "../pricing/getLastItemPrice";
import { getProductFillCost } from "@/app/accounting/pricing/_calculations/getProductFillCost";
import { staticRecords } from "@/configs/staticRecords";

export const getFinishedProductsByPurchasedItem = async (itemId: string, itemPricingData: ItemPricingData, lastPrice: LastItemPrice) => {

    const fp = await prisma.finishedProduct.findMany({
        where: {
            filledWithItemId: itemId,
            recordStatusId: {
                not: staticRecords.app.recordStatuses.archived,
            }
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

    const itemCost = getItemCost(itemPricingData, lastPrice)

    const withAuxiliaries = await Promise.all(
        fp.map(async (current) => {
            const auxiliaries = await getAuxiliariesTotalCost(current.auxiliaries);
            const productFillCost = getProductFillCost(current.fillQuantity, itemCost)
            const finishedProductTotalCost = productFillCost +
                auxiliaries.total +
                current.difficultyAdjustmentCost +
                current.freeShippingCost;

            return {
                ...current,
                auxiliaries,
                calculatedTotals: {
                    productFillCost,
                    finishedProductTotalCost
                }
            };
        })
    );



    return withAuxiliaries;
};

export type FinishedProductFromPurchased = Awaited<ReturnType<typeof getFinishedProductsByPurchasedItem>>[number]

