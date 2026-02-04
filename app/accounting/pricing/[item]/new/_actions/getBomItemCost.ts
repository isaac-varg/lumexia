'use server'

import { PricingBOM } from "./getPricingBom"
import { uom } from "@/configs/staticRecords/unitsOfMeasurement";
import { uomUtils } from "@/utils/uom";

const lb = uom.pounds

export const getBomItemCost = async (bom: PricingBOM[], batchSize: number) => {

  const bomWithPricing = Promise.all(bom.map(async (i) => {

    const pricingDataExists = i.item.itemPricingData.length !== 0;
    const lastPurchase = i.item.purchaseOrderItem[0];

    // basic data
    const isUpcomingPrice = pricingDataExists ? i.item.itemPricingData[0].isUpcomingPriceActive : false;
    const priceUomId = isUpcomingPrice ? i.item.itemPricingData[0].upcomingPriceUomId : lastPurchase.uomId;
    const priceUomIsStandard = isUpcomingPrice
      ? i.item.itemPricingData[0].upcomingPriceUom.isStandardUom
      : lastPurchase.uom.isStandardUom;
    const price = isUpcomingPrice ? i.item.itemPricingData[0].upcomingPrice : lastPurchase.pricePerUnit;

    const itemId = i.item.id;
    const supplierId = lastPurchase.purchaseOrders.supplierId;

    // Convert price to $/lb using the unified conversion approach
    // Note: For price conversion, we need the inverse of quantity conversion.
    // If 1 kg = 2.2 lb, then $10/kg = $10/2.2 = $4.54/lb
    // We achieve this by converting 1 lb to the source UOM, then multiplying.
    let convertedPrice = price;
    if (priceUomId !== lb) {
      try {
        convertedPrice = price * await uomUtils.convert(
          { id: lb, isStandard: true },
          1,
          { id: priceUomId, isStandard: priceUomIsStandard },
          itemId,
          supplierId
        );
      } catch (error: any) {
        throw new Error(`UOM conversion failed for BOM item "${i.item.name}": ${error.message}`);
      }
    }

    const itemCost = convertedPrice +
      (i.item.itemPricingData[0]?.arrivalCost || 0) +
      (i.item.itemPricingData[0]?.unforeseenDifficultiesCost || 0) +
      (i.item.itemPricingData[0]?.productionUsageCost || 0);

    // calculations
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
      priceUsed: isUpcomingPrice ? 'Upcoming Price' : `Price from PO #${lastPurchase.purchaseOrders.referenceCode}`
    }

  }));


  return bomWithPricing

}

export type PricingBomItemCost = Awaited<ReturnType<typeof getBomItemCost>>[number]

