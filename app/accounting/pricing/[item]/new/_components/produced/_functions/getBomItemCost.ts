'use server'

import { PricingBOM } from "./getPricingBom"
import { getConversionFactor } from "@/utils/uom/getConversionFactor";
import { staticRecords } from "@/configs/staticRecords";

const lb = staticRecords.inventory.uom.lb

export const getBomItemCost = async (bom: PricingBOM[], batchSize: number) => {

    const bomWithPricing = Promise.all(bom.map(async (i) => {


        const pricingDataExists = i.item.itemPricingData.length !== 0;

        // basic data
        const isUpcomingPrice = pricingDataExists ? i.item.itemPricingData[0].isUpcomingPriceActive : false;
        const priceUom = isUpcomingPrice ? i.item.itemPricingData[0].upcomingPriceUomId : i.item.purchaseOrderItem[0].uomId;
        const price = isUpcomingPrice ? i.item.itemPricingData[0].upcomingPrice : i.item.purchaseOrderItem[0].pricePerUnit;



        // item cost calculated 
        const convertedPrice = priceUom === lb ? price : await getConvertedPrice(priceUom, price);

        const itemCost = convertedPrice +
            (i.item.itemPricingData[0]?.arrivalCost || 0) +
            (i.item.itemPricingData[0]?.unforeseenDifficultiesCost || 0) +
            (i.item.itemPricingData[0]?.productionUsageCost || 0);

        // cacluations
        const itemQuantityInBatch = (i.concentration / 100) * batchSize;
        const itemCostInBatch = itemQuantityInBatch * itemCost;
        const itemCostPerLb = itemCostInBatch / batchSize;


        return {
            ...i,
            itemCostInBatch,
            isUpcomingPriceActive: isUpcomingPrice,
            priceUom: lb,
            itemCostPerLb,
            totalItemCost: itemCost,
            itemCost: convertedPrice,
            priceUsed: isUpcomingPrice ? 'Upcoming Price' : `Price from PO #${i.item.purchaseOrderItem[0].purchaseOrders.referenceCode}`
        }

    }));


    return bomWithPricing

}

export type PricingBomItemCost = Awaited<ReturnType<typeof getBomItemCost>>[number]

const getConvertedPrice = async (currentUomId: string, price: number) => {
    const conversionFactor = await getConversionFactor(currentUomId, lb);

    if (!conversionFactor) {
        throw new Error(`Conversion factor not found for ${currentUomId} `)
    }

    return price / conversionFactor;
}


