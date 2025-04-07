'use server'

import { getItemPricingData } from "@/actions/accounting/pricing/getItemPricingData";
import { getItemCost } from "@/app/accounting/pricing/_calculations/getItemCost";
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"
import { convertUom } from "@/utils/uom/convertUom";
import { getConversionFactor } from "@/utils/uom/getConversionFactor";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

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
            mbpr: {
                include: {
                    BatchSize: {
                        where: {
                            recordStatusId: staticRecords.app.recordStatuses.active
                        }
                    }
                }
            }
        },
    });


    const missingPricingData: string[] = [];

    const withPricing = await Promise.all(bom.map(async (b) => {

        const batchSize = b.mbpr.BatchSize[0].quantity;

        const hasPricing = !!b.item.itemPricingData || b.item.purchaseOrderItem.length > 0;

        if (!hasPricing || !batchSize) {
            missingPricingData.push(b.item.name);
            return null;
        }        

        const { isUpcomingPriceActive, upcomingPrice, productionUsageCost, unforeseenDifficultiesCost, upcomingPriceUomId, arrivalCost } = b.item.itemPricingData[0];

        const price = isUpcomingPriceActive ? upcomingPrice : b.item.purchaseOrderItem[0].pricePerUnit;
        const priceUom = isUpcomingPriceActive ? upcomingPriceUomId : b.item.purchaseOrderItem[0].uomId;

        let priceConverted = price;

        if (priceUom !== lb) {
            const conversionFactor = await getConversionFactor(priceUom, lb);
            if (!conversionFactor) throw new Error('Conversion factor not found.');
            priceConverted = price * conversionFactor;
        }

        const itemCost = getItemCost(priceConverted, arrivalCost, unforeseenDifficultiesCost) + productionUsageCost;
        const itemCostPerBatch = (b.concentration / 100) * batchSize
        const itemCostPerPound = itemCostPerBatch / batchSize;

        return ({
            ...b,
            itemCost,
            productionUsageCost,
            unforeseenDifficultiesCost,
            isUpcomingPriceActive,
            upcomingPrice,
            priceConverted,
            priceUom,
            itemCostPerBatch,
            itemCostPerPound
        });

    }));

    const filteredBom = withPricing.filter(b => b !== null);
    const overallBomCostPerBatch = filteredBom.reduce((total, current) => {
        if (!current) {
            throw new Error("Something went wrong while calculating overall bom cost per batch")
        }
        return total + current.itemCostPerBatch;
    }, 0);

    const overallBomCostPerLb = filteredBom.reduce((total, current) => {
        if (!current) {
            throw new Error("Something went wrong while calculating overall bom cost per pound")
        }

        return total + current.itemCostPerPound;
    }, 0)


    return {
        bom: filteredBom,
        missingPricingData,
        overallBomCostPerBatch,
        overallBomCostPerLb,
    };
}


export type PricingBomObject = Awaited<ReturnType<typeof getBomWithPricing>>
export type PricingBom = Awaited<ReturnType<typeof getBomWithPricing>>["bom"][number]


