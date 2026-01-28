import { FinishedProductAuxiliary } from "@/actions/accounting/finishedProducts/auxiliaries/getAll";
import { getItemCost } from "./getItemCost";
import { getLastItemPrice } from "@/actions/accounting/pricing/getLastItemPrice";

export const getAuxiliariesTotalCost = async (auxiliaries: FinishedProductAuxiliary[]) => {
  const detailedCosts = await Promise.all(
    auxiliaries.map(async (current) => {
      const lastItemPrice = await getLastItemPrice(current.auxiliaryItemId);

      const pricingData = current.auxiliaryItem.itemPricingData[0]

      if (!pricingData) {
        throw new Error(`Pricing data not provided for auxiliary item: ${current.auxiliaryItem.name}`)
      }

      const itemCost = getItemCost(
        pricingData,
        lastItemPrice
      );

      const auxiliaryUsageCost = current.auxiliaryItem.itemPricingData[0].auxiliaryUsageCost;
      const difficultyAdjustmentCost = current.difficultyAdjustmentCost;
      const quantity = current.quantity;

      const lineTotal = (itemCost + auxiliaryUsageCost + difficultyAdjustmentCost) * quantity;

      return {
        auxiliaryId: current.id,
        auxiliaryItemId: current.auxiliaryItemId,
        name: current.auxiliaryItem.name,
        itemCost,
        auxiliaryUsageCost,
        difficultyAdjustmentCost,
        quantity,
        lineTotal,
        auxiliaryItemPricingData: current.auxiliaryItem.itemPricingData,
      };
    })
  );

  const total = detailedCosts.reduce((acc, { lineTotal }) => acc + lineTotal, 0);

  return {
    total,
    breakdown: detailedCosts,
  };
};


export type AuxiliaryItemBreakdown = Awaited<ReturnType<typeof getAuxiliariesTotalCost>>["breakdown"][number]
