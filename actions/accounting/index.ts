import { createFilledConsumerContainer } from "./consumerContainers/createFilledConsumerContainer";
import { createOneConsumerContainer } from "./consumerContainers/createOne";
import { getAllConsumerContainers } from "./consumerContainers/getAll";
import { getAllByFillItem } from "./consumerContainers/getAllByFillItem";
import { getPackagingItems } from "./consumerContainers/getPackagingItems";
import { getItemPricingData } from "./pricing/getItemPricingData";
import { getLastItemPrice } from "./pricing/getLastItemPrice";

export const accountingActions = {
    pricing: {
        item: {
            getItemPricingData: getItemPricingData,
            getLastItemPrice: getLastItemPrice,
        }
    },
    filledConsumerContainers: {
        getAllByFillItem: getAllByFillItem,
        createOne: createFilledConsumerContainer,
    },
    consumerContainers: {
        getPackagingItems: getPackagingItems,
        getAll: getAllConsumerContainers,
        createOne: createOneConsumerContainer,
    }
}
