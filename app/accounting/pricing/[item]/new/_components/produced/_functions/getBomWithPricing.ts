'use server'

import { getItemCost } from "@/app/accounting/pricing/_calculations/getItemCost";
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"
import { convertUom } from "@/utils/uom/convertUom";

const lb = staticRecords.inventory.uom.lb;

export const getBomWithPricing = async (mbprId: string) => {

    const bom = await prisma.billOfMaterial.findMany({
        where: {
            mbprId,
        },
        include: {
            item: {
                include: {
                    itemPricingData: true,
                    purchaseOrderItem: {
                        take: 5,
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                },
            },
        },
    });

    let hasMissing = false;

    // TODO this all assumes lb...

    const withPricing = bom.map((b) => {

        const { isUpcomingPriceActive, upcomingPrice, productionUsageCost, unforeseenDifficultiesCost, upcomingPriceUomId, arrivalCost } = b.item.itemPricingData[0];
        
       convertUom 
        const price = isUpcomingPriceActive ? upcomingPrice :  b.item.purchaseOrderItem[0].pricePerUnit;
        const priceUom = isUpcomingPriceActive ? upcomingPriceUomId : b.item.purchaseOrderItem[0].uomId;
        

        const itemCost = getItemCost()
        b.item.

            return({
                ...b,

            })

    })

    return {
        bom: withPricing,
        hasMissing,
    }
}

export type PricingBom = Awaited<ReturnType<typeof getBomWithPricing>>[number]
