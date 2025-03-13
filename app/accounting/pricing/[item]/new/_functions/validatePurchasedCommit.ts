import { InterimConsumerContainerData } from "@/store/pricingPurchasedSlice";

export const validatePurchasedCommit = (
    serverFilledContainersCount: number,
    interimConsumerContainers: InterimConsumerContainerData[]
)  => {


    const profitPercentageThreshold = 25;

    const checks = {
        examinedConsumerContainerCountsMatch: serverFilledContainersCount === interimConsumerContainers.length,
        allInterimViewed: interimConsumerContainers.every((c) => c.wasViewed === true),
        allProfitPercentagesExceedThreshold: interimConsumerContainers.every((c) => c.profitPercentage > profitPercentageThreshold),
        // Add additional checks here if needed
    };

    const allValid = Object.values(checks).every(Boolean);



   
    return { allValid, checks };
};

export type PurchasedValidation = ReturnType<typeof validatePurchasedCommit>;
