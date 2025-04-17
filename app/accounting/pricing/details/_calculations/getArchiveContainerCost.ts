import { SinglePricingExaminationCombined } from "@/actions/accounting/examinations/getOne";

type ArchiveContainerData = SinglePricingExaminationCombined['filledConsumerContainerArchives'][number]

export const getArchiveContainerCost = (container: ArchiveContainerData, itemCost: number) => {

    const {fillLaborCost, freeShippingCost, shippingCost, containerCost } =  container.consumerContainerArchive;

    const { fillQuantity, difficultiesCost } = container 

    const containerCostEmpty = 
        fillLaborCost +
        freeShippingCost +
        shippingCost +
        containerCost 

    const filledProductCost = (itemCost * fillQuantity) + difficultiesCost;

    const overallContainerCost = containerCostEmpty + filledProductCost

    return overallContainerCost;
}
