'use server'

import { getItemCost } from "@/app/accounting/pricing/_calculations/getItemCost";
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"
import { getConversionFactor } from "@/utils/uom/getConversionFactor";

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
                        take: 1,
                        orderBy: {
                            updatedAt: 'desc',
                        },
                    },
                },
            },
            mbpr: {
                include: {
                    BatchSize: {
                        where: {
                            recordStatusId: staticRecords.app.recordStatuses.active
                        },
                        include: {
                            batchSizeCompoundingVessels: true
                        }
                    }
                }
            }
        },
    });

    // get static labor cost
    const fixedTankLaborCostResponse = await prisma.config.findFirst({
        where: {
            id: 'b3474654-d309-4259-9e28-f0e6fb57f593'
        },
    });
    const fixedTankLaborCost = parseFloat(fixedTankLaborCostResponse?.value || '0')

    // pricing 

    const missingPricingData: string[] = [];

    const withPricing = await Promise.all(bom.map(async (b) => {

        // ensure has active batchsize
        const batchSize = b.mbpr.BatchSize[0].quantity;

        // check if has item pricing data 
        const hasPricingData = b.item.itemPricingData.length !== 0

        // check if has a purchase order
        const hasPurchaseOrder = b.item.purchaseOrderItem.length !== 0

        // make pricing data entry for future
        if (!hasPricingData) {
            await prisma.itemPricingData.create({
                data: {
                    itemId: b.itemId,
                    isUpcomingPriceActive: false,
                    upcomingPrice: 0,
                    productionUsageCost: 0,
                    unforeseenDifficultiesCost: 0,
                    upcomingPriceUomId: lb,
                    arrivalCost: 0,
                }
            });
        }

        // conditions in which pricing cannot continue
        // there is no purchase order
        // and there is no pricing data
        // and there is pricing data but the upcoming price is not active and there is no po.
        if (!hasPurchaseOrder && !hasPricingData && (hasPricingData && !b.item.itemPricingData[0].isUpcomingPriceActive && !hasPurchaseOrder)) {
            missingPricingData.push(b.item.name);
            return;
        }

        // destructure the pricing data safely
        const {
            isUpcomingPriceActive,
            upcomingPrice,
            productionUsageCost,
            unforeseenDifficultiesCost,
            upcomingPriceUomId,
            arrivalCost
        } = b.item.itemPricingData?.[0] ?? {};


        let price: number | undefined;
        let priceUom: string | undefined;

        if (isUpcomingPriceActive) {
            price = upcomingPrice;
            priceUom = upcomingPriceUomId;
        } else if (b.item.purchaseOrderItem && b.item.purchaseOrderItem.length > 0) {
            price = b.item.purchaseOrderItem[0].pricePerUnit;
            priceUom = b.item.purchaseOrderItem[0].uomId;
        } else {
            // Handle the case where there's no upcoming price and no purchase order
            // You might want to set default values, log an error, or handle this differently
            price = 0; // Or some other default value
            priceUom = lb; // Or some other default UOM, or handle the lack of UOM
            missingPricingData.push(b.item.name + ' (No active price or purchase order)');
            return null; // Skip processing this item further
        }

        let priceConverted = price;

        if (priceUom !== lb && priceUom !== undefined) {
            const conversionFactor = await getConversionFactor(priceUom, lb);
            if (!conversionFactor) throw new Error('Conversion factor not found.');
            priceConverted = price * conversionFactor;
        }


        const itemCost = getItemCost(priceConverted, arrivalCost, unforeseenDifficultiesCost) + productionUsageCost;
        const quantityInBatch = (b.concentration / 100) * batchSize
        const itemCostPerBatch = quantityInBatch * itemCost;
        const itemCostPerPound = itemCostPerBatch / batchSize;

        return ({
            ...b,
            itemCost,
            arrivalCost,
            productionUsageCost,
            unforeseenDifficultiesCost,
            isUpcomingPriceActive,
            upcomingPrice,
            priceConverted,
            priceUom,
            quantityInBatch,
            itemCostPerBatch,
            itemCostPerPound
        });

    }));

    // labourCost

    // get batchsize
    const laborCostPerBatch = bom[0].mbpr.BatchSize[0].batchSizeCompoundingVessels[0].tankTime * fixedTankLaborCost;
    const laborCostPerLb = laborCostPerBatch / bom[0].mbpr.BatchSize[0].quantity



    const filteredBom = withPricing.filter(b => b !== null);
    const overallBomCostPerBatch = filteredBom.reduce((total, current) => {
        if (!current) {
            throw new Error("Something went wrong while calculating overall bom cost per batch")
        }
        return total + current.itemCostPerBatch;
    }, 0) + laborCostPerBatch;

    const overallBomCostPerLb = filteredBom.reduce((total, current) => {
        if (!current) {
            throw new Error("Something went wrong while calculating overall bom cost per pound")
        }

        return total + current.itemCostPerPound;
    }, 0) + laborCostPerLb


    return {
        bom: filteredBom,
        missingPricingData,
        overallBomCostPerBatch,
        overallBomCostPerLb,
    };
}


export type PricingBomObject = Awaited<ReturnType<typeof getBomWithPricing>>
export type PricingBom = Awaited<ReturnType<typeof getBomWithPricing>>["bom"][number]


