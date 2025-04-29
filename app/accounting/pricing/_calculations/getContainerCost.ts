import { FilledConsumerContainer } from "@/actions/accounting/consumerContainers/getAllByFillItem";

export const getContainerCost = (filledConsumerContainer: FilledConsumerContainer, itemCost: number) => {

    const {fillLaborCost, freeShippingCost,  containerCost } = filledConsumerContainer.consumerContainer;

    const { fillQuantity, difficultiesCost } = filledConsumerContainer

    const containerCostEmpty = 
        fillLaborCost +
        freeShippingCost +
        containerCost 

    const filledProductCost = (itemCost * fillQuantity) + difficultiesCost;

    const overallContainerCost = containerCostEmpty + filledProductCost

    return overallContainerCost;
}
