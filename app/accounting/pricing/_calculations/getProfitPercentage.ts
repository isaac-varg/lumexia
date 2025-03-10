export const getProfitPercentage = (profit: number, overallFilledContainerCost: number) => {
    return (profit / overallFilledContainerCost) * 100;
}
