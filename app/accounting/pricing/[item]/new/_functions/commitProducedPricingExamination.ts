'use server'
import { accountingActions } from "@/actions/accounting"
import { ExaminationValidationPayload } from "@/actions/accounting/examinations/archives/createExaminationValidationArchive"
import { completePricingQueues } from "./completePricingQueues"
import prisma from "@/lib/prisma"
import { FinishedProductFromPurchased } from "@/actions/accounting/finishedProducts/getByPurchasedItem"
import { BatchSummations } from "../_components/produced/_functions/getBomPricingSummations"
import { ProducedValidation } from "./validateProducedCommit"
import { InterimFinishedProduct } from "@/store/pricingProducedSlice"
import { MbprByItem } from "@/actions/production/getMbprsByItem"
import { BatchSize } from "@/actions/production/mbpr/batchSizes/getAllByMbpr"

export const commitProducedPricingExamination = async (
    examinationId: string,
    stateData: { interimFinishedProducts: InterimFinishedProduct[], finishedProducts: FinishedProductFromPurchased[], activeMbpr: MbprByItem, batchSize: BatchSize, batchSummations: BatchSummations },
    validation: ProducedValidation,
) => {

    const { interimFinishedProducts, finishedProducts, batchSummations, activeMbpr, batchSize } = stateData;

    if (
        !batchSummations || !activeMbpr || !batchSize || batchSize.batchSizeCompoundingVessels.length === 0
    ) {
        throw new Error("There was not enough data to submit.")
    }

    console.dir(batchSummations, { depth: null })


    // ensure pricing examination id exists and create if not
    const pricingExamination = await accountingActions.examinations.upsert(examinationId, activeMbpr.producesItemId)


    // producedpricingdataarchive 
    const producedExaminationDataArchive = await prisma.producedPricingDataArchive.create({
        data: {
            mbprId: activeMbpr.id,
            examinationId,
            mbprVersionLabel: activeMbpr.versionLabel || '',
            batchSizeId: batchSize.id,
            batchSizeQuantity: batchSize.quantity,
            compoundingVesselId: batchSize.batchSizeCompoundingVessels[0].compoundingVesselId,
            compoundingVesselEquipmentName: batchSize.batchSizeCompoundingVessels[0].compoundingVesselId,
            compoundingTankTime: batchSize.batchSizeCompoundingVessels[0].tankTime,
            bomCount: batchSummations.bomWithCost.length,
            totalBomCostPerBatch: batchSummations.totalBomCostPerBatch,
            totalBomCostPerLb: batchSummations.totalBomCostPerLb,
            totalCostPerBatch: batchSummations.totalCostPerBatch,
            totalCostPerLb: batchSummations.totalCostPerLb
        }
    });




    // bom pricing data archive
    await Promise.all(batchSummations.bomWithCost.map(async (bom) => {




    }))



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

    await completePricingQueues(activeMbpr.producesItemId)


    return pricingExamination

}
