'use server'

import { accountingActions } from "@/actions/accounting"
import { ItemPricingData } from "@/actions/accounting/pricing/getItemPricingData"
import { LastItemPrice } from "@/actions/accounting/pricing/getLastItemPrice"
import { uom } from "@/configs/staticRecords/unitsOfMeasurement"
import { PricingError } from "@/utils/errors/PricingError"
import { uomUtils } from "@/utils/uom"

// total cost per lb is defined as
// the sum of
//    currentMaterialCost
//    arrival costs
//    unforeseen diffulties cost
//
// where currentMaterialCost is
//    cost per unit from the most recent purchase order
//    or if upcoming price is active, the set upcoming price


export const getTotalCostPerLbPurchased = async (lastPurchase: LastItemPrice, pricingData: ItemPricingData) => {

  if (!pricingData) {
    throw new PricingError('NULL_REFERENCE', "The pricing data is null", { 'nullReferenceIdentifier': 'pricingData' })
  }

  if (!pricingData.isUpcomingPriceActive && !lastPurchase) {
    throw new PricingError('NULL_REFERENCE', 'A price cannot be found from the last purchase price and there is no active upcoming price set')
  }

  const currentMaterialCost = pricingData.isUpcomingPriceActive
    ? pricingData.upcomingPrice
    : lastPurchase?.pricePerUnit;

  const currentCostUomId = pricingData.isUpcomingPriceActive
    ? pricingData.upcomingPriceUomId
    : lastPurchase?.uomId;

  const currentCostUomIsStandard = pricingData.isUpcomingPriceActive
    ? pricingData.upcomingPriceUom.isStandardUom
    : lastPurchase?.uom.isStandardUom ?? true;

  const itemId = pricingData.itemId;
  const supplierId = lastPurchase?.purchaseOrders?.supplierId;

  if (!currentMaterialCost || !currentCostUomId) {
    throw new PricingError('NULL_REFERENCE', "Either the current material cost or current cost uom is null")
  }

  // handle uom conversion
  // TODO use a defaultUom instead of lbs because metric is better
  // Note: For price conversion, we need the inverse of quantity conversion.
  // If 1 kg = 2.2 lb, then $10/kg = $10/2.2 = $4.54/lb
  // We achieve this by converting 1 lb to the source UOM, then multiplying.

  const convertedCurrentMaterialCost = currentCostUomId === uom.pounds
    ? currentMaterialCost
    : currentMaterialCost * await uomUtils.convert(
      { id: uom.pounds, isStandard: true },
      1,
      { id: currentCostUomId, isStandard: currentCostUomIsStandard },
      itemId,
      supplierId
    )

  return convertedCurrentMaterialCost +
    pricingData.arrivalCost +
    pricingData.unforeseenDifficultiesCost

}
