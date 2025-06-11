// item cost is defined as 
// last purchase price of the material or upcoming price + 
// arrival costs
// unforeseen diffulties cost
//
//export const getItemCost = (price: number, arrivalCost: number, unforeseenDifficultiesCost: number) => {
//    
//    return price + arrivalCost + unforeseenDifficultiesCost;
//
//}

import { ItemPricingData } from "@/actions/accounting/pricing/getItemPricingData";
import { LastItemPrice } from "@/actions/accounting/pricing/getLastItemPrice";


// item cost is defined as
// priceperunit + arrivalCost + unforeseenDifficultiesCost
//
// where itemCost is the upcoming price if isUpcomingPriceActive is true and the lastPurchasePrice otherwise

export const getItemCost = (pricingData: ItemPricingData, lastPurchaseOrder?: null | LastItemPrice) => {

    if (!pricingData) throw new Error('Pricing data not provided')

    const isUpcomingPriceActive = pricingData.isUpcomingPriceActive || false

    if ((isUpcomingPriceActive && !pricingData.upcomingPrice) || (!isUpcomingPriceActive && !lastPurchaseOrder)) {
        console.error('Item Causing Error:', pricingData.itemId)
        throw new Error('Not enough pricing data: Either the upcoming price is active, but not set or upcoming price is inactive, but there is no purchase order.')
    }

    const pricePerUnit = isUpcomingPriceActive ? pricingData.upcomingPrice : (lastPurchaseOrder?.pricePerUnit || 0)

    const itemCost = pricePerUnit +
        pricingData.arrivalCost +
        pricingData.unforeseenDifficultiesCost;

    return itemCost

}
