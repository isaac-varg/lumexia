import { PricingBOM } from "./getPricingBom"

export const validatePricingBom = (bom: PricingBOM[]) => {

    const errorOnBomItem: string[] = [];

    bom.forEach((i) => {
        const itemPricingData = i.item.itemPricingData; // ipd
        const lastPurchase = i.item.purchaseOrderItem; // lp
        const itemName = i.item.name;
        const itemSequence = i.identifier;

        const ipdTruthy = itemPricingData.length !== 0 && itemPricingData[0].isUpcomingPriceActive;
        const lpTruthy = lastPurchase.length !== 0;

        if (!ipdTruthy && !lpTruthy) {
            errorOnBomItem.push(`#${itemSequence} ${itemName}`);
        }
    })


    if (errorOnBomItem.length !== 0) {
        return {
            passes: false,
            errorOnBomItem,
        };
    }

    return {
        passes: true
    }
}
