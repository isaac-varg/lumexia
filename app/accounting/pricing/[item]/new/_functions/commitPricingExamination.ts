'use server'
import { accountingActions } from "@/actions/accounting"
import { InterimFinishedProduct } from "@/store/pricingPurchasedSlice"
import { PurchasedValidation } from "./validatePurchasedCommit"
import { ExaminationValidationPayload } from "@/actions/accounting/examinations/archives/createExaminationValidationArchive"
import { completePricingQueues } from "./completePricingQueues"
import prisma from "@/lib/prisma"
import { FinishedProductFromPurchased } from "@/actions/accounting/finishedProducts/getByPurchasedItem"
import { ItemPricingData } from "@/actions/accounting/pricing/getItemPricingData"

export const commitPricingExamination = async (
    examinationId: string,
    stateData: { interimFinishedProducts: InterimFinishedProduct[], finishedProducts: FinishedProductFromPurchased[], pricingDataObject: ItemPricingData },
    validation: PurchasedValidation,
) => {

    const { interimFinishedProducts, finishedProducts, pricingDataObject } = stateData;

    if (
        !pricingDataObject
    ) {
        throw new Error("There was not enough data to submit.")
    }

    // ensure pricing examination id exists and create if not
    const pricingExamination = await accountingActions.examinations.upsert(examinationId, pricingDataObject.itemId)

    // item pricing data archives
    const { id, arrivalCost, productionUsageCost, auxiliaryUsageCost, unforeseenDifficultiesCost, overallItemCost, upcomingPrice, upcomingPriceUomId, isUpcomingPriceActive } = pricingDataObject
    const ipdaPayload = {
        examinationId: pricingExamination.id,
        currentItemPricingDataId: id,
        arrivalCost,
        productionUsageCost,
        auxiliaryUsageCost,
        unforeseenDifficultiesCost,
        overallItemCost,
        upcomingPrice,
        upcomingPriceUomId,
        isUpcomingPriceActive,
    }

    await accountingActions.examinations.archives.itemPricingData.create(ipdaPayload)



    // finished product archives


    const finishedProductsMap = new Map(finishedProducts.map(fp => [fp.id, fp]))

    const finishedProductPayload = interimFinishedProducts.map((i) => {

        const matchingFinishedProduct = finishedProductsMap.get(i.finishedProductId);

        return ({
            pricingExaminationId: pricingExamination.id,
            currentFinishedProductId: matchingFinishedProduct?.id || '',
            name: matchingFinishedProduct?.name || '',
            filledWithItemId: matchingFinishedProduct?.filledWithItemId || '',
            fillQuantity: matchingFinishedProduct?.fillQuantity || 0,
            declaredQuantity: matchingFinishedProduct?.declaredQuantity || 0,
            freeShippingCost: matchingFinishedProduct?.freeShippingCost || 0,
            fillUomId: matchingFinishedProduct?.fillUomId || '',
            difficultyAdjustmentCost: matchingFinishedProduct?.difficultyAdjustmentCost || 0,
            finishedProductTotalCost: matchingFinishedProduct?.calculatedTotals.finishedProductTotalCost || 0,
            auxiliariesTotalCost: matchingFinishedProduct?.auxiliaries.total || 0,
            productFillCost: matchingFinishedProduct?.calculatedTotals?.productFillCost || 0,
            consumerPrice: i.consumerPrice,
            markup: i.markup,
            profit: i.profit,
            profitPercentage: i.profitPercentage,
        })
    });

    await prisma.finishedProductArchive.createMany({
        data: finishedProductPayload,
    });


    // auxiliaries archive

    const auxuiliariesArchivePayload: any[] = [];


    finishedProducts.forEach(fp => {
        fp.auxiliaries.breakdown.forEach(aux => {
            auxuiliariesArchivePayload.push({
                apartOfFinishedProductId: fp.id,
                auxiliaryItemId: aux.auxiliaryItemId,
                quantity: aux.quantity,
                difficultyAdjustmentCost: aux.difficultyAdjustmentCost,
                ipdArrivalCost: aux.auxiliaryItemPricingData[0].arrivalCost,
                ipdProductionUsageCost: aux.auxiliaryItemPricingData[0].productionUsageCost,
                ipdAuxiliaryUsageCost: aux.auxiliaryItemPricingData[0].auxiliaryUsageCost,
                ipdUnforeseenDifficultiesCost: aux.auxiliaryItemPricingData[0].unforeseenDifficultiesCost,
                ipdUpcomingPrice: aux.auxiliaryItemPricingData[0].upcomingPrice,
                ipdIsUpcomingPriceActive: aux.auxiliaryItemPricingData[0].isUpcomingPriceActive,
                ipdUpcomingPriceUomId: aux.auxiliaryItemPricingData[0].upcomingPriceUomId
            })
        })
    })


    await prisma.finishedProductAuxiliaryArchive.createMany({
        data: auxuiliariesArchivePayload,

    })


    // pricing examination validation archives
    const pevaPayload: ExaminationValidationPayload = {

        examinationId: pricingExamination.id,
        allContainersReviewed: validation.checks.allInterimViewed,
        allContainersExceedProfitThreshold: validation.checks.allProfitPercentagesExceedThreshold,
    }

    await accountingActions.examinations.archives.examinationValidation.create(pevaPayload);

    await completePricingQueues(pricingDataObject.itemId)


    return pricingExamination

}
