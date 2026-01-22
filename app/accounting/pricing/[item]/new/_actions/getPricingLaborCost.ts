import { PricingMbpr } from "./getPricingMbpr";

export const getPricingLaborCost = (mbpr: PricingMbpr) => {

    if (!mbpr ||
        mbpr.BatchSize.length === 0 ||
        mbpr.BatchSize[0].batchSizeCompoundingVessels.length === 0 ||
        !mbpr.BatchSize[0].batchSizeCompoundingVessels[0].tankTime ||
        !mbpr.BatchSize[0].batchSizeCompoundingVessels[0].compoundingVessel.operationalCost
    ) {
        throw new Error('MBPR batch size is messing some data.')
    }

    const tankTime = mbpr.BatchSize[0].batchSizeCompoundingVessels[0].tankTime;
    const operationalCost = mbpr.BatchSize[0].batchSizeCompoundingVessels[0].compoundingVessel.operationalCost;

    return tankTime * operationalCost;

}
