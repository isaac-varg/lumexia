'use server'

import prisma from "@/lib/prisma"

export const getSteps = async (bprId: string) => {
  const steps = await prisma.bprBatchStep.findMany({
    where: {
      bprId,
    },
    include: {
      status: true,
      bprStepActionables: {
        include: {
          stepActionable: {
            include: {
              actionableType: true
            }
          }
        }
      },
      batchStep: {
        include: {
          StepAddendum: {
            include: {
              addendumType: true
            }
          },
          StepEquipment: true,
          StepInstruction: true,
        }
      },
    }
  });

  return steps;
}

export type ProductionStep = Awaited<ReturnType<typeof getSteps>>[number];
