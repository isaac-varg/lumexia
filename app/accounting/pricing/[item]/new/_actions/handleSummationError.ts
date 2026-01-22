import { BatchSummations } from "./getBomPricingSummations"
import { ProducedPricingSummations } from "./getBomWithPricing"

export const handleSummationError = (pricingData: ProducedPricingSummations) => {

  const summations = pricingData?.isError ? null : pricingData as BatchSummations

  return summations;
}


