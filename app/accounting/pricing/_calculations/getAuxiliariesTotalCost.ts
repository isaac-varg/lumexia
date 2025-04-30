import { FinishedProductAuxiliary } from "@/actions/accounting/finishedProducts/auxiliaries/getAll";
import { getItemCost } from "./getItemCost";
import { getLastItemPrice } from "@/actions/accounting/pricing/getLastItemPrice";

export const getAuxiliariesTotalCost = async (auxiliaries: FinishedProductAuxiliary[]) => {
    const detailedCosts = await Promise.all(
        auxiliaries.map(async (current) => {
            const lastItemPrice = await getLastItemPrice(current.auxiliaryItemId);

            const itemCost = getItemCost(
                current.auxiliaryItem.itemPricingData[0],
                lastItemPrice
            );

            const auxiliaryUsageCost = current.auxiliaryItem.itemPricingData[0].auxiliaryUsageCost;
            const difficultyAdjustmentCost = current.difficultyAdjustmentCost;
            const quantity = current.quantity;

            const lineTotal = (itemCost + auxiliaryUsageCost + difficultyAdjustmentCost) * quantity;

            return {
                auxiliaryItemId: current.auxiliaryItemId,
                name: current.auxiliaryItem.name,
                itemCost,
                auxiliaryUsageCost,
                difficultyAdjustmentCost,
                quantity,
                lineTotal,
            };
        })
    );

    const total = detailedCosts.reduce((acc, { lineTotal }) => acc + lineTotal, 0);

    return {
        total,
        breakdown: detailedCosts,
    };
};

