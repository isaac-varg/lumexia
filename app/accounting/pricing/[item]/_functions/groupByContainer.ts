import { FilledConsumerContainerArchive } from "@/actions/accounting/examinations/archives/getFilledConsumerContainers";

type ContainerGroup = {
    containerItemId: string;
    containerName: string;
    referenceCode: string;
    totalFillQuantity: number;
    totalDeclaredQuantity: number;
    totalDifficultiesCost: number;
    totalConsumerPrice: number;
    entries: FilledConsumerContainerArchive[];
};

export const groupByContainerItemId = (data: any[]): ContainerGroup[] => {
    const containerMap: Record<string, ContainerGroup> = {};

    for (const entry of data) {
        for (const filledContainer of entry.filledConsumerContainerArchives) {
            const containerData = filledContainer.consumerContainerArchive.containerItem;
            const containerItemId = containerData.id;

            if (!containerMap[containerItemId]) {
                containerMap[containerItemId] = {
                    containerItemId,
                    containerName: containerData.name,
                    referenceCode: containerData.referenceCode,
                    totalFillQuantity: 0,
                    totalDeclaredQuantity: 0,
                    totalDifficultiesCost: 0,
                    totalConsumerPrice: 0,
                    entries: []
                };
            }

            containerMap[containerItemId].totalFillQuantity += filledContainer.fillQuantity;
            containerMap[containerItemId].totalDeclaredQuantity += filledContainer.declaredQuantity;
            containerMap[containerItemId].totalDifficultiesCost += filledContainer.difficultiesCost;
            containerMap[containerItemId].totalConsumerPrice += filledContainer.consumerPrice;
            containerMap[containerItemId].entries.push(filledContainer);
        }
    }

    return Object.values(containerMap);
}
