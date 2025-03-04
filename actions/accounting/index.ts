import { getAllByFillItem } from "./consumerContainers/getAllByFillItem";
import { getItemPricingData } from "./pricing/getItemPricingData";
import { getLastItemPrice } from "./pricing/getLastItemPrice";

export const accountingActions = {
    pricing: {
        item: {
            getItemPricingData: getItemPricingData,
            getLastItemPrice: getLastItemPrice,
        }
    },
    consumerContainers: {
        getAllByFillItem: getAllByFillItem, 
    },
}
