import { accountingActions } from "@/actions/accounting"
import { PricingPurchasedState } from "@/store/pricingPurchasedSlice"
import { PurchasedValidation } from "./validatePurchasedCommit"
import { ItemPricingDataArchivePayload } from "@/actions/accounting/examinations/archives/createItemPricingDataArchive"
import { ConsumerContainerArchivePayload } from "@/actions/accounting/examinations/archives/createManyConsumerContainerArchives"
import { FilledConsumerContainerArhivePayload } from "@/actions/accounting/examinations/archives/createManyFilledConsumerContainerArchives"
import { ExaminationValidationPayload } from "@/actions/accounting/examinations/archives/createExaminationValidationArchive"
import { staticRecords } from "@/configs/staticRecords"
import { completePricingQueues } from "./completePricingQueues"

export const commitPricingExamination = async (
    examinationId: string,
    examinedItemId: string,
    pricingState: PricingPurchasedState,
    validation: PurchasedValidation,
    pricingDataId: string | null,
) => {

    // ensure pricing examination id exists and create if not
    const pricingExamination = await accountingActions.examinations.upsert(examinationId, examinedItemId)


    // item pricing data archives
    const { arrivalCost, productionUsageCost, unforeseenDifficultiesCost, upcomingPrice, upcomingPriceUom, upcomingPriceActive } = pricingState
    const ipdaPayload: ItemPricingDataArchivePayload = {
        examinationId: pricingExamination.id,
        ...(pricingDataId && { currentItemPricingDataId: pricingDataId }),
        arrivalCost,
        productionUsageCost,
        unforeseenDifficultiesCost,
        overallItemCost: pricingState.itemCost,
        upcomingPrice,
        upcomingPriceUomId: upcomingPriceUom?.id || staticRecords.inventory.uom.lb,
        isUpcomingPriceActive: upcomingPriceActive,

    }
    await accountingActions.examinations.archives.itemPricingData.create(ipdaPayload)



    //consumer container archives

    const { consumerContainers, interimConsumerContainers } = pricingState

    const ccaPayload: ConsumerContainerArchivePayload[] = [];

    consumerContainers.forEach((cc) => {
        const container = cc.consumerContainer;

        const payload: ConsumerContainerArchivePayload = {
            examinationId: pricingExamination.id,
            currentConsumerContaineId: container.id,
            containerItemId: container.containerItemId,
            containerCost: container.containerCost,
            fillLaborCost: container.fillLaborCost,
            shippingCost: container.shippingCost,
            freeShippingCost: container.freeShippingCost,
        }

        ccaPayload.push(payload);
    });

    const consumerContainerArchives = await accountingActions.examinations.archives.consumerContainer.createMany(ccaPayload);


    // filled consumer container archives

    const iccaPayload: FilledConsumerContainerArhivePayload[] = [];

    consumerContainers.forEach((cc) => {

        const consumerContainerArchiveId = consumerContainerArchives[consumerContainerArchives.findIndex((container) => container.currentConsumerContaineId === cc.consumerContainerId)].id
        const interimConsumerPricing = interimConsumerContainers[interimConsumerContainers.findIndex((icc) => icc.filledConsumerContainerId === cc.id)].consumerPrice;

        const payload: FilledConsumerContainerArhivePayload = {
            examinationId: pricingExamination.id,
            currentItemConsumerContainerId: cc.id,
            consumerContainerArchiveId,
            fillQuantity: cc.fillQuantity,
            declaredQuantity: cc.fillQuantity,
            uomId: cc.uomId,
            difficultiesCost: cc.difficultiesCost,
            consumerPrice: interimConsumerPricing,
        }

        iccaPayload.push(payload);
    })

    await accountingActions.examinations.archives.filleConsumerContainer.createMany(iccaPayload)



    // pricing examination validation archives

    const pevaPayload: ExaminationValidationPayload = {

        examinationId: pricingExamination.id,
        allContainersReviewed: validation.checks.allInterimViewed,
        allContainersExceedProfitThreshold: validation.checks.allProfitPercentagesExceedThreshold,
    }

    await accountingActions.examinations.archives.examinationValidation.create(pevaPayload);

    await completePricingQueues(examinedItemId)


    return pricingExamination

}
