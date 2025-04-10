'use server'

import { StateForCommit } from "@/store/pricingProducedSlice"
import { ProducedValidation } from "./validateProducedCommit"
import { accountingActions } from "@/actions/accounting"
import { Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"
import { ConsumerContainerArchivePayload } from "@/actions/accounting/examinations/archives/createManyConsumerContainerArchives"
import { FilledConsumerContainerArhivePayload } from "@/actions/accounting/examinations/archives/createManyFilledConsumerContainerArchives"
import { ExaminationValidationPayload } from "@/actions/accounting/examinations/archives/createExaminationValidationArchive"

export const commitProducedPricingExamination = async (
    examinationId: string,
    examinedItemId: string,
    validation: ProducedValidation,
    pricingState: StateForCommit,
) => {

    // ensure pricing examination id exists and if not upsert it (because of notes)
    const pricingExamination = await accountingActions.examinations.upsert(examinationId, examinedItemId)

    // produced pricing data archives
    if (!pricingState.bomObject || !pricingState.activeMbpr || !pricingState.activeBatchSize) {
        console.error("Missing pricing state data")
        return
    }

    const { overallBomCostPerBatch, overallBomCostPerLb } = pricingState.bomObject

    const producedPricingDataArchivesPayload: Prisma.ProducedPricingDataArchiveUncheckedCreateInput = {
        examinationId: pricingExamination.id,
        bomCostPerBatch: overallBomCostPerBatch,
        bomCostPerLb: overallBomCostPerLb,
        mbprId: pricingState.activeMbpr.id,
        mbprVersionLabel: pricingState.activeMbpr.versionLabel || '',
        batchSizeId: pricingState.activeBatchSize.id,
        batchSizeQuantity: pricingState.activeBatchSize.quantity,
        productionVesselName: pricingState.activeBatchSize.batchSizeCompoundingVessels[0].compoundingVessel.equipment.name,
        tankTime: pricingState.activeBatchSize.batchSizeCompoundingVessels[0].tankTime,
    }

    const archiveData = await prisma.producedPricingDataArchive.create({
        data: producedPricingDataArchivesPayload,
    });

    // bom pricing data archives
    const bomArchivePayload: Prisma.BomPricingDataArchiveUncheckedCreateInput[] = []

    pricingState.bomObject.bom.forEach((material) => {

        if (!material) {
            console.error('Material data missing');
            return;
        };

        const { id, itemId, itemCost, isUpcomingPriceActive, arrivalCost, unforeseenDifficultiesCost, productionUsageCost, itemCostPerPound, itemCostPerBatch, } = material;


        const payload: Prisma.BomPricingDataArchiveUncheckedCreateInput = {
            producedPricingDataArchiveId: archiveData.id,
            bomId: id,
            itemId: itemId,
            materialCost: itemCost,
            upcomingPriceUsed: isUpcomingPriceActive,
            arrivalCost,
            unforeseenDifficultiesCost,
            productionUsageCost,
            overallItemCostPerLb: itemCostPerPound,
            overallItemCostPerBatch: itemCostPerBatch,
        }
        bomArchivePayload.push(payload);
    })

    await prisma.bomPricingDataArchive.createMany({
        data: bomArchivePayload,
    });

    // consumer container archive
    const { filledConsumerContainers, interimConsumerContainers } = pricingState

    const ccaPayload: ConsumerContainerArchivePayload[] = [];

    filledConsumerContainers.forEach((cc) => {
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

    filledConsumerContainers.forEach((cc) => {

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


    return pricingExamination
}
