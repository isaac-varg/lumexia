import { PricingBomItemCost } from "./getBomItemCost";

export const getBomPricingSummations = (bomItemCost: PricingBomItemCost[], laborCost: number, batchSizeQuantity: number) => {

    const totalBomCostPerLb = bomItemCost.reduce((accumulator, current) => {
        return accumulator + current.itemCostPerLb;
    }, 0);
    const totalBomCostPerBatch = bomItemCost.reduce((accumulator, current) => {
        return accumulator + current.itemCostInBatch;
    }, 0);


    // in the future this will include consumables TODO
    const totalCostPerBatch = totalBomCostPerBatch + laborCost;

    const totalCostPerLb = totalCostPerBatch / batchSizeQuantity;

    return {
        bomWithCost: bomItemCost,
        totalBomCostPerLb,
        totalBomCostPerBatch,
        laborCost,
        totalCostPerBatch,
        totalCostPerLb,
        isError: false
    }
}

export type BatchSummations = ReturnType<typeof getBomPricingSummations>
