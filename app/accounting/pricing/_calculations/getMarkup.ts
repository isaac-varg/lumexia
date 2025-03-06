export const getMarkup = (overallFilledContainerCost: number, consumerPrice: number) => {

    return ((consumerPrice - overallFilledContainerCost) /  overallFilledContainerCost ) * 100
}
