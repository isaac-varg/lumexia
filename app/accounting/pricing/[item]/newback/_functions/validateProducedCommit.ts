import { InterimFinishedProduct } from "@/store/pricingProducedSlice";

export const validateProducedCommit = (
    serverFilledContainersCount: number,
    interimFinishedProducts: InterimFinishedProduct[]
) => {
    const profitPercentageThreshold = 25;

    const checks = {
        examinedConsumerContainerCountsMatch: serverFilledContainersCount === interimFinishedProducts.length,
        allInterimViewed: interimFinishedProducts.every((c) => c.wasViewed === true),
        allProfitPercentagesExceedThreshold: interimFinishedProducts.every((c) => c.profitPercentage > profitPercentageThreshold),
        // Add additional checks here if needed
    };

    const allValid = Object.values(checks).every(Boolean);

    return { allValid, checks };
}


export type ProducedValidation = ReturnType<typeof validateProducedCommit>;
