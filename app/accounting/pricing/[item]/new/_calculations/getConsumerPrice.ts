// this must be a percentage
// e.g., 15% not 0.15
export const getConsumerPrice = (overallFilledContainerCost: number, markupPercentage: number) => {

    return overallFilledContainerCost * ((markupPercentage / 100) + 1);
}
