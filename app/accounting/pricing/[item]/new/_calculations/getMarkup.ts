export const getMarkup = (finishedProductTotalCost: number, consumerPrice: number) => {
    const grossProfit = consumerPrice - finishedProductTotalCost;

    return ((grossProfit) / finishedProductTotalCost) * 100
}
