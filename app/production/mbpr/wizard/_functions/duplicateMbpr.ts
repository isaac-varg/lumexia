"use server"

import { productionActions } from "@/actions/production"
import prisma from "@/lib/prisma"

export const duplicateMbpr = async (mbprId: string) => {


    const originalMbpr = await prisma.masterBatchProductionRecord.findFirst({
        where: {
            id: mbprId,
        },
        include: {
            BatchSize: {
                include: {
                    batchSizeCompoundingVessels: true
                }
            },
        }
    });


    const originalData = await prisma.batchStep.findMany({
        where: {
            mbprId,
        },
        include: {
            BillOfMaterial: true,
            StepInstruction: true,
            StepAddendum: true,
            StepActionable: true
        }
    });


    if (!originalMbpr || !originalData) return;

    // strip some elements out of mbpr
    const { id, createdAt, versionLabel, updatedAt, BatchSize, ...mbprPayload } = originalMbpr;

    const newMbpr = await prisma.masterBatchProductionRecord.create({
        data: {
            versionLabel: `Copy of ${versionLabel} `,
            ...mbprPayload
        },
        include: {
            producesItem: true,
            BillOfMaterial: {
                include: {
                    item: true,
                    step: true,
                }
            },
            BatchSize: {
                include: {
                    recordStatus: true
                }
            },
            recordStatus: true,
        }
    });

    // steps

    // hash map for translating old to new id of the duplicate step
    const stepIdMap = new Map<string, string>();

    await Promise.all(originalData.map(async (step) => {
        const newStep = await prisma.batchStep.create({
            data: {
                mbprId: newMbpr.id,
                sequence: step.sequence,
                phase: step.phase,
                label: step.label,
            }
        });

        stepIdMap.set(step.id, newStep.id);

        return newStep;
    }));

    // bom
    const originalBom = originalData.flatMap(data => data.BillOfMaterial)
    const bomPayload = originalBom.map((bom) => {
        const { id, createdAt, updatedAt, mbprId, stepId, ...restBom } = bom
        const newStep = stepIdMap.get(bom.stepId);

        if (!newStep) { throw new Error("Issue looking up new step id") }
        return {
            stepId: newStep,
            mbprId: newMbpr.id,
            ...restBom
        }
    })
    await prisma.billOfMaterial.createMany({
        data: [...bomPayload]
    })

    // instructions
    const originalInstructions = originalData.flatMap(data => data.StepInstruction);
    const instructionPayload = originalInstructions.map((instr) => {
        const newStep = stepIdMap.get(instr.stepId);

        if (!newStep) { throw new Error("Issue looking up new step id") }

        return ({
            stepId: newStep,
            instructionContent: instr.instructionContent,
        })
    });
    await prisma.stepInstruction.createMany({
        data: [...instructionPayload]
    })

    // addendums
    const originalAddendums = originalData.flatMap(data => data.StepAddendum);
    const addendumPaylaod = originalAddendums.map((add) => {
        const newStep = stepIdMap.get(add.stepId);

        if (!newStep) { throw new Error("Issue looking up new step id") }

        return ({
            stepId: newStep,
            addendumTypeId: add.addendumTypeId,
            content: add.content
        })
    })
    await prisma.stepAddendum.createMany({
        data: [...addendumPaylaod]
    });

    //  actionables
    const originalActionables = originalData.flatMap(data => data.StepActionable);
    const actionablesPayload = originalActionables.map((action) => {
        const newStep = stepIdMap.get(action.stepId);

        if (!newStep) { throw new Error("Issue looking up new step id") }

        const { id, createdAt, updatedAt, stepId, ...rest } = action;

        return ({
            stepId: newStep,
            ...rest
        });

    });
    await prisma.stepActionable.createMany({
        data: [...actionablesPayload]
    });

    // batch sizes

    const batchSizeMap = new Map<string, string>();
    await Promise.all(originalMbpr.BatchSize.map(async (size) => {

        const newSize = await prisma.batchSize.create({
            data: {
                mbprId: newMbpr.id,
                quantity: size.quantity,
                uomId: size.uomId,
                recordStatusId: size.recordStatusId,
            }
        });

        batchSizeMap.set(size.id, newSize.id)
    }))

    // compounding vessels
    const originalVessels = originalMbpr.BatchSize.flatMap(v => v.batchSizeCompoundingVessels);
    const vesselPayload = originalVessels.map((v) => {

        const { id, createdAt, updatedAt, batchSizeId, ...rest } = v
        const newSize = batchSizeMap.get(v.batchSizeId);

        if (!newSize) { throw new Error("Issue looking up new size id") }

        return ({
            batchSizeId: newSize,
            ...rest
        })

    });
    await prisma.batchSizeCompoundingVessel.createMany({
        data: [...vesselPayload]
    })


    return newMbpr;

}
