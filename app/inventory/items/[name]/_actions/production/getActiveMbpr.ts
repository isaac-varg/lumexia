"use server"

import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"

const produced = staticRecords.inventory.procurementTypes.produced;
const active = staticRecords.app.recordStatuses.active

export const getActiveMbpr = async (itemId: string) => {

  const item = await prisma.item.findFirst({ where: { id: itemId } });

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
