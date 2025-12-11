import { InterimFinishedProduct } from "@/store/pricingPurchasedSliceback";

export const validatePurchasedCommit = (
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
};

export type PurchasedValidation = ReturnType<typeof validatePurchasedCommit>;
