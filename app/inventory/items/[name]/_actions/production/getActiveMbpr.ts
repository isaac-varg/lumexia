"use server"

import { procurementTypes } from "@/configs/staticRecords/procurementTypes";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import prisma from "@/lib/prisma"

const produced = procurementTypes.produced;
const active = recordStatuses.active

export const getActiveMbpr = async (itemId: string) => {

  const item = await prisma.item.findFirst({
    where: {
      id: itemId,
      recordStatusId: {
        not: recordStatuses.archived
      }
    }
  });

  // item not found or procurment type not produced
  if (!item || item.procurementTypeId !== produced) return null;

  const mbpr = await prisma.masterBatchProductionRecord.findFirst({
    where: {
      producesItemId: itemId,
      recordStatusId: active,
    },
    include: {
      BillOfMaterial: {
        include: {
          item: true,
          step: true,
        },
      },
      BatchSize: {
        include: {
          batchSizeCompoundingVessels: {
            include: {
              compoundingVessel: {
                include: {
                  equipment: true
                }
              }
            }
          }
        }
      },
    },
  });

  return mbpr;

}

export type ItemActiveMbpr = Awaited<ReturnType<typeof getActiveMbpr>>

export type ItemActiveMbprBatchSize = NonNullable<ItemActiveMbpr>['BatchSize'][number];
