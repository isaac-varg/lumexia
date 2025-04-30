
export const getFinishedProductTotalCost = (productFillCost: number, auxiliariesTotalCost: number, difficultyAdjustmentCost: number, freeShipingCost: number) => {

    return productFillCost +
        auxiliariesTotalCost +
        difficultyAdjustmentCost +
        freeShipingCost;

}
