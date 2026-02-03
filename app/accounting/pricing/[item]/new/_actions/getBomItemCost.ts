'use server'

import { PricingBOM } from "./getPricingBom"
import { getConversionFactor } from "@/utils/uom/getConversionFactor";
import { inventoryActions } from "@/actions/inventory";
import { uom } from "@/configs/staticRecords/unitsOfMeasurement";

const lb = uom.pounds

export const getBomItemCost = async (bom: PricingBOM[], batchSize: number) => {

  const bomWithPricing = Promise.all(bom.map(async (i) => {


    const pricingDataExists = i.item.itemPricingData.length !== 0;

    // basic data
    const isUpcomingPrice = pricingDataExists ? i.item.itemPricingData[0].isUpcomingPriceActive : false;
    const priceUom = isUpcomingPrice ? i.item.itemPricingData[0].upcomingPriceUomId : i.item.purchaseOrderItem[0].uomId;
    const price = isUpcomingPrice ? i.item.itemPricingData[0].upcomingPrice : i.item.purchaseOrderItem[0].pricePerUnit;


    // item cost calculated 
    let convertedPrice = price;
    if (priceUom === uom.units || priceUom === uom.case) {
      const converted = await getGenericUnitsConvertedPrice(i.item.id, i.item.purchaseOrderItem[0].purchaseOrders.supplierId, price, i.item.name)
      convertedPrice = converted
    }

    if (priceUom !== lb && priceUom !== uom.units && priceUom !== uom.case) {
      const converted = await getConvertedPrice(priceUom, price, i.item);
      convertedPrice = converted;
    }

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

const getConvertedPrice = async (currentUomId: string, price: number, item: any) => {
  const conversionFactor = await getConversionFactor(currentUomId, lb);

  if (!conversionFactor) {
    console.error('the item in question', item)
    throw new Error(`Conversion factor not found for item "${item.name}"`)
  }

  return price / conversionFactor;
}


const getGenericUnitsConvertedPrice = async (itemId: string, supplierId: string, price: number, itemName: string) => {
  const conversionFactor = await inventoryActions.genericUnitsConversion.getBySupplierItemUnique(itemId, supplierId);

  if (!conversionFactor) {
    throw new Error(`No conversion factor found for item "${itemName}"`)
  }

  if (conversionFactor.convertToUomId !== lb) {
    throw new Error('Conversion factor for generic unit is not converting to pounds, which is required for BOM cost calculations.')
  }

  return price / conversionFactor.conversionFactor



}

