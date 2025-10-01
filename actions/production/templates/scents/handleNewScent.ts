"use server"

import { staticRecords } from "@/configs/staticRecords";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import { uom } from "@/configs/staticRecords/unitsOfMeasurement";
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client";

export const handleNewScent = async (itemId: string) => {

  // determine if existing before

  const mbprCount = await prisma.masterBatchProductionRecord.count({
    where: {
      producesItemId: itemId,
    }
  });

  if (mbprCount !== 0) {
    // mbpr exists do nothing
    const mbpr = await prisma.masterBatchProductionRecord.findFirst({
      where: { producesItemId: itemId },
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
    })
    if (!mbpr) {
      throw new Error('There was an error getting the scent ready.')
    }

    const step = await prisma.batchStep.findFirst({
      where: { mbprId: mbpr.id },
      include: {
        StepActionable: true,
        StepAddendum: true,
        StepEquipment: true,
        StepInstruction: true,
        BillOfMaterial: {
          include: {
            item: true
          }
        },
      }
    })
    return { mbpr, step, }
  }

  // if dne then create from template

  // create mbpr

  const mbprPayload: Prisma.MasterBatchProductionRecordUncheckedCreateInput = {
    producesItemId: itemId,
    recordStatusId: recordStatuses.active,
    versionLabel: 'Main',
    estimatedTotalTime: 0.25,
  }
  const mbpr = await prisma.masterBatchProductionRecord.create({
    data: mbprPayload,
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

  // create step
  const stepPayload: Prisma.BatchStepUncheckedCreateInput = {
    mbprId: mbpr.id,
    sequence: 1,
    phase: 'A',
    label: 'Blend',
  };
  const step = await prisma.batchStep.create({
    data: stepPayload,
    include: {
      StepActionable: true,
      StepAddendum: true,
      StepEquipment: true,
      StepInstruction: true,
      BillOfMaterial: {
        include: {
          item: true
        }
      },
    }
  });

  // create instructions
  await prisma.stepInstruction.create({
    data: {
      stepId: step.id,
      instructionContent: 'Sequentially add all blend components to a new gallon. Mix well.'
    }
  });

  // create actionables
  // TODO determine if these are actually needed.

  // TODO future add equipment

  // create batch size
  const batchSize = await prisma.batchSize.create({
    data: {
      mbprId: mbpr.id,
      quantity: 5,
      uomId: uom.pounds,
      recordStatusId: recordStatuses.active,
    }
  });

  // create compounding vessel for batch size

  await prisma.batchSizeCompoundingVessel.create({
    data: {
      tankTime: 0.25,
      compoundingVesselId: staticRecords.production.templates.essentialFragranceOil.compoundingVessel,
      batchSizeId: batchSize.id,
    }
  })

  return {
    mbpr,
    step,
  };

}
