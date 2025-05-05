import { accountingActions } from "@/actions/accounting"
import { PricingPurchasedState } from "@/store/pricingPurchasedSlice"
import { PurchasedValidation } from "./validatePurchasedCommit"
import { ItemPricingDataArchivePayload } from "@/actions/accounting/examinations/archives/createItemPricingDataArchive"
import { ExaminationValidationPayload } from "@/actions/accounting/examinations/archives/createExaminationValidationArchive"
import { staticRecords } from "@/configs/staticRecords"
import { completePricingQueues } from "./completePricingQueues"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const commitPricingExamination = async (
    examinationId: string,
    pricingState: PricingPurchasedState,
    validation: PurchasedValidation,
) => {

    const { interimFinishedProducts, finishedProducts } = pricingState;

    if (
        !pricingState.pricingDataObject
    ) {
        throw new Error("There was not enough data to submit.")
    }


    // ensure pricing examination id exists and create if not
    const pricingExamination = await accountingActions.examinations.upsert(examinationId, pricingState.pricingDataObject.itemId)


    // item pricing data archives
    const { arrivalCost, productionUsageCost, unforeseenDifficultiesCost, pricingDataObject, upcomingPrice, upcomingPriceUom, upcomingPriceActive } = pricingState
    const ipdaPayload: ItemPricingDataArchivePayload = {
        examinationId: pricingExamination.id,
        currentItemPricingDataId: pricingDataObject.id,
        arrivalCost,
        productionUsageCost,
        auxiliaryUsageCost: 0,
        unforeseenDifficultiesCost,
        overallItemCost: pricingState.itemCost,
        upcomingPrice,
        upcomingPriceUomId: upcomingPriceUom?.id || staticRecords.inventory.uom.lb,
        isUpcomingPriceActive: upcomingPriceActive,

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
    
    const auxuiliariesArchivePayload: Prisma.FinishedProductAuxiliaryArchiveUncheckedCreateInput[] = [];


    finishedProducts.forEach(fp => {
        fp.auxiliaries.breakdown.forEach(aux => {
            auxuiliariesArchivePayload.push({
                apartOfFinishedProductId: fp.id,
                auxiliaryItemId: aux.auxiliaryItemId,
                quantity: aux.quantity,
                difficultyAdjustmentCost: aux.difficultyAdjustmentCost,
                ipdArrivalCost: fp.aux
            })
        })
    }) 


    await prisma.finishedProductAuxiliaryArchive.createMany({
        data: 
            
        })
    })




    // pricing examination validation archives

    const pevaPayload: ExaminationValidationPayload = {

        examinationId: pricingExamination.id,
        allContainersReviewed: validation.checks.allInterimViewed,
        allContainersExceedProfitThreshold: validation.checks.allProfitPercentagesExceedThreshold,
    }

    await accountingActions.examinations.archives.examinationValidation.create(pevaPayload);

    await completePricingQueues(pricingState.pricingDataObject.itemId)


    return pricingExamination

}
