import { PricingBOM } from "./getPricingBom";

export const validatePricingBom = (bom: PricingBOM[]) => {

  const errorOnBomItem: string[] = [];

  bom.forEach((i) => {
    const itemPricingData = i.item.itemPricingData;
    const lastPurchase = i.item.purchaseOrderItem;
    const itemName = i.item.name;
    const itemSequence = i.identifier;



    const hasSufficientPricing = itemPricingData != null &&
      Array.isArray(itemPricingData) &&
      itemPricingData.length > 0 &&
      itemPricingData[0] != null &&
      itemPricingData[0].isUpcomingPriceActive === true;

    const hasSufficientPurchase = lastPurchase != null &&
      Array.isArray(lastPurchase) &&
      lastPurchase.length > 0;


    // flag if it has NEITHER sufficient pricing NOR sufficient purchase data
    if (!hasSufficientPricing && !hasSufficientPurchase) {
      errorOnBomItem.push(`#${itemSequence} ${itemName}`);
    }
  });


  if (errorOnBomItem.length !== 0) {
    return {
      passes: false,
      errorOnBomItem,
    };
  }

  return {
    errorOnBomItem,
    passes: true
  };
};
