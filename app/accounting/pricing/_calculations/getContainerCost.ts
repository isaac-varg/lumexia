import { FilledConsumerContainer } from "@/actions/accounting/consumerContainers/getAllByFillItem";

export const getContainerCost = (filledConsumerContainer: FilledConsumerContainer, itemCost: number) => {

    const {fillLaborCost, freeShippingCost, shippingCost, containerCost } = filledConsumerContainer.consumerContainer;

    const { fillQuantity, difficultiesCost } = filledConsumerContainer

    const containerCostEmpty = 
        fillLaborCost +
        freeShippingCost +
        shippingCost +
        containerCost 

    const filledProductCost = (itemCost * fillQuantity) + difficultiesCost;

    const overallContainerCost = containerCostEmpty + filledProductCost

    return overallContainerCost;
}
