'use server'

import { getPricingMbpr } from "./getPricingMbpr";
import { PricingError, throwPricingError } from "./throwPricingError";
import { getPricingBom } from "./getPricingBom";
import { validatePricingBom } from "./validatePricingBom";
import { getPricingLaborCost } from "./getPricingLaborCost";
import { getBomItemCost } from "./getBomItemCost";
import { BatchSummations, getBomPricingSummations } from "./getBomPricingSummations";


export const getBomWithPricing = async (mbprId: string): Promise<BatchSummations | PricingError> => {

    // get the mbpr main data
    const mbpr = await getPricingMbpr(mbprId);

    if (!mbpr) {
        return throwPricingError({ message: 'There was an error retrieving the MBPR.', errorOnFunction: 'getMbpr' })
    }

    if (mbpr.BatchSize.length === 0 ||
        mbpr.BatchSize[0].batchSizeCompoundingVessels.length === 0 ||
        !mbpr.BatchSize[0].batchSizeCompoundingVessels[0].tankTime ||
        !mbpr.BatchSize[0].batchSizeCompoundingVessels[0].compoundingVessel.operationalCost
    ) {
        return throwPricingError({
            message: 'The MBPR is missing either a batch size tank time or the compounding vessel is missing the operational cost.',
            errorOnFunction: 'getPricingMbpr'
        })
    }


    // get the bom
    const bom = await getPricingBom(mbpr.id);

    if (bom.length === 0) {
        return throwPricingError({ message: 'No BOM line items returned', errorOnFunction: 'getPricingBom' })
    }


    // validate the bom for pricing
    const isBomValidated = validatePricingBom(bom)

    if (!isBomValidated.passes) {
        return throwPricingError({
            message: 'The following BOM items are missing both Item Pricing Data in which the upcoming price is active and a last purchase price.',
            errorOnFunction: 'isBomValidated',
            data: isBomValidated.errorOnBomItem,
        })
    }

    // get the labor cost
    const laborCost = getPricingLaborCost(mbpr)


    // get the bom item cost
    const bomItemCosts = await getBomItemCost(bom, mbpr.BatchSize[0].quantity);


    // sum these
    const bomWithPricing = getBomPricingSummations(bomItemCosts, laborCost, mbpr.BatchSize[0].quantity)

    return bomWithPricing;
}

export type ProducedPricingSummations = Awaited<ReturnType<typeof getBomWithPricing>>



