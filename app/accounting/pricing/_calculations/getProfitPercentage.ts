export const getProfitPercentage = (finishedProductTotalCost: number, consumerPrice: number) => {
    const grossProfit = consumerPrice - finishedProductTotalCost
    return (grossProfit / consumerPrice) * 100;
}
